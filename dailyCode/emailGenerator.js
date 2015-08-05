var db = require('../database/db');
var fs = require('fs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var os = require('os');
var config = require('../config');

var transporter = nodemailer.createTransport(smtpTransport(config.smtp));

//task -- returns array of users with an id, a name, and a token
var generateTokens = function(next, users){
	var createToken = function() {
		var token = "";
		for(var i = 0; i < 50; i++){
			token += String.fromCharCode(Math.floor(Math.random() * 26 + 65));
		}
		return token;
	}

	var numQuizzes = emails.getQuizCount();

	for(var i = 0; i < users.length; i++){
		users[i].tokens = [];
		for(var j = 0; j < numQuizzes; j++){
			users[i].tokens.push(createToken());
		}
	}

	next(users);
};

var insertTokens = function(next, users) {
	var total = users.length * users[0].tokens.length;
	var count = 0;
	for(var i = 0; i < users.length; i++){
		for(var j = 0; j < users[i].tokens.length; j++){
			db.query('insert into emailTokens VALUES(?, ?)', [users[i].id, users[i].tokens[j]], function(err, message){
				if(err){
					console.log(err);
				}
				count++;
				if(count == total){
					next(users);
				}
			});
		}
	}

	console.log('insert tokens:');
	console.log(users);	
};

//used by sendQuiz
var format = function(body, userName, userToken, quizId){
	var name = userName.split('.');
	for(var i = 0; i < name.length; i++){
		name[i] = name[i][0].toUpperCase() + name[i].substr(1);
	}
	name = name.join(' ');
	var hostname = os.hostname().split('.')[0];
	var result = body.replace(/\{\{name\}\}/g, name);
	result = result.replace(/\{\{token\}\}/g, userToken);
	result = result.replace(/\{\{id\}\}/g, quizId);
	result = result.replace(/\{\{hostname\}\}/g, hostname);
	return result;
};

//task -- returns text of file
var getBody = function(next){
	console.log("retrieving email body...");
	fs.readFile(__dirname + '/email.html', 'utf8', function(err, data){
		if(!err){
			emails.setBody(data);
			next(data);
		}else{
			console.log('cannot get file');
			process.exit();
		}
	})
};

//task -- returns if there are any quizzes to email
var getQuizzes = function(next){
	console.log("fetching quizzes from today");
	var today = (new Date()).toISOString().substr(0,10);
	var opts = {};
	var query =  'select id, title from quizzes where publish=?';
	db.query(query, today, function(err, message){
		if(!err){
			if(!message.length){
				console.log("no quizzes to be sent");
				process.exit();
			}else{
				emails.setQuizzes(message);
				next(message);
			}
		}
	});
};

//task -- returns list of users to email
var getUsers = function(next){
	console.log("fetching user list");
	var query = 'select id, name from users';
	db.query(query, function(err, message){
		if(err) {
			console.log('ALERT: getUsers Error!');
			console.log(err);
			process.exit();
		}
		next(message)
	});
};

//task + helpers -- returns nothing
var emails = new (function(){
	var quizzes = [];
	var body = "";

	this.setBody = function(data){
		body = data;
	};

	this.setQuizzes = function(data){
		quizzes = data;
	};

	this.getQuizCount = function(){
		return quizzes.length;
	};

	this.send = function(next, users){
		var count = 0;

		var check = function(){
			count++;
			if(count == users.length){
				next();
			}
		};

		for(var i = 0; i < users.length; i++){
			emails.sendToUser(check, {
				quizzes: quizzes,
				body: body,
				tokens: users[i].tokens,
				name: users[i].name
			});
		}
	};

	this.sendToUser = function(next, opts){
		if(!opts.quizzes.length){
			return next();
		}else{
			var count = 0;

			var check = function(){
				count++;
				if(count == opts.quizzes.length){
					next();
				}
			};
			console.log(opts);
			for(var i = 0; i < opts.quizzes.length; i++){
				emails.sendQuiz(check, {
					user: opts.name,
					token: opts.tokens[i],
					quizName: opts.quizzes[i].title,
					quizId: opts.quizzes[i].id,
					body: opts.body
				});
			}
		}
	};

	this.sendQuiz = function(next, opts){
		console.log("sending email to " + opts.user + " for quiz " + opts.quizName);
		transporter.sendMail({
    		from: "Qwizard <qwizard@asynchrony.com>",
    		to: opts.user + "@asynchrony.com",
    		subject: opts.quizName + " Quiz is Ready", // Subject line
    		html: format(opts.body, opts.user, opts.token, opts.quizId)
		}, next);
	};
})();

// TASKS:
// get email body
// get quizzes that need to be emailed
// get the list of people to email to
// generate email tokens
// insert user-token pairs into db
// format and send email for each user for each quiz
// link form: http://localhost:3000/verify/ThIsRaNdOmEmAiLkEy?redirect=/taker/quiz/###

module.exports = {
	generateTokens: generateTokens,
	insertTokens: insertTokens,
	format: format,
	getBody: getBody,
	getQuizzes: getQuizzes,
	getUsers: getUsers,
	emails: emails,
	nodemailerTransport: transporter
};
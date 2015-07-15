var db = require('../database/db');
var fs = require('fs');
var nodemailer = require('nodemailer');
var email = nodemailer.createTransport();
var os = require('os');

//task -- returns array of users with an id, a name, and a token
var generateTokens = function(next, users){
	var createToken = function() {
		var token = "";
		for(var i = 0; i < 50; i++){
			token += String.fromCharCode(Math.floor(Math.random() * 26 + 65));
		}
		return token;
	}

	users.forEach(function(user) {
		user.token = createToken();
	});

	next(users);
};

var insertTokens = function(next, users) {
	users.forEach(function(user) {
		db.query('insert into emailTokens VALUES(?, ?)', [user.id, user.token], function(err, message){
			if(err){
				console.log(err);
			}
		});
	});
	console.log('insert tokens:');
	console.log(users);	

	next(users);
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

	this.send = function(next, users){
		var count = 0;


		var check = function(){
			count++;
			if(count == quizzes.length){
				next();
			}
		};

		for(var i = 0; i < quizzes.length; i++){
			sendQuiz(check, {
				quizName: quizzes[i].title,
				quizId: quizzes[i].id,
				body: body,
				recipients: JSON.parse(JSON.stringify(users))
			});
		}
	};
})();

//used by emails.send
var sendQuiz = function(next, opts){
	if(!opts.recipients.length){
		return next();
	}else{
		var recipient = opts.recipients.shift();
		console.log("sending email to " + recipient.name);
		email.sendMail({
    		from: "Qwizard <qwizard@asynchrony.com>",
    		to: recipient.name + "@asynchrony.com",
    		subject: opts.quizName + " Quiz is Ready", // Subject line
    		html: format(opts.body, recipient.name, recipient.token, opts.quizId)
		}, function(){
			sendQuiz(next, opts);
		});
	}
};





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
	sendQuiz: sendQuiz,
	nodemailerTransport: email
};
var should = require('should');
var assert = require('assert');
var request = require('request');
var convert = require('../routes/userConversion');
var db = require('../database/db');

describe("Manage quizzes endpoint", function(done){
	var options = {
        url: "http://localhost:3000/maker/#/finished",
        headers: {
            'cookie': "login=a",
            'content-type': 'application/json'
        }
    }

    var quizId;
    var bindId;
    var userId1;
    var userId2;
    var userId3;

    var quiz = {
        answers: "[[0], [0]]",
        results: "2014-12-08",
        publish: "2014-12-04",
        pointvalues: "[5, 4]",
        title: "Title",
        questions: "[{\"type\":\"tf\",\"text\":\"TestQuestionText\",\"answers\":\"[\"\",\"\",\"\"]\",\"name\":\"TestQuestion\"},{\"type\":\"tf\",\"text\":\"TestQuestionText\",\"answers\":\"[\"\",\"\",\"\"]\",\"name\":\"TestQuestion\"}]"
    }

    var user1 = {
    	name: "qwizardtestuser.1"
    }

    var user2 = {
    	name: "qwizardtestuser.2"
    }
    var user3 = {
    	name: "qwizardtestuser.3"
    }

    beforeEach("Login", function(done) {
        convert.nameToId("proj-1189-bind", function(id) {
            bindId = id;
            db.query("INSERT INTO tokens values ('a', ?)", id, function() {
            	db.query("insert into quizzes SET ?", quiz, function(err, message) {
            		quizId = message.insertId;
            		db.query("insert into users SET ?", user1, function(err, message) {
            			userId1 = message.insertId;
					    db.query("insert into users SET ?", user2, function(err, message) {
			            	userId2 = message.insertId;
			            	db.query("insert into users SET ?", user3, function(err, message) {
				            	userId3 = message.insertId;
							    var results1 = {
							    	quizid: quizId,
							    	userid: userId1,
							    	points: 4,
							    	answers: "[]",
							    	submitted: 1
							    }


							    db.query("insert into results SET ?", results1, function(err, message) {
								    var results2 = {
								    	quizid: quizId,
								    	userid: userId2,
								    	points: 0,
								    	answers: "[]",
								    	submitted: 0
								    }
									db.query("insert into results SET ?", results2, function(err, message) {
										var results3 = {
									    	quizid: quizId,
									    	userid: userId3,
									    	points: 8,
									    	answers: "[]",
									    	submitted: 1
									    }
										db.query("insert into results SET ?", results3, function(err, message) {
									    	if(err) {
									    		console.log(err);
									    	}
									    	done();
								   		});
							    	});
						    	});
							});
					    });
		    		});
		    	});
            })
        });
    });

    afterEach("Logout", function(done) {
        db.query("delete from results where quizid=" + quizId, function(err, message) {
            db.query("delete from quizzes", function(err, message) {
                db.query("delete from tokens where cookie='a'", function(err, message) {
                    db.query("alter table quizzes auto_increment=" + quizId, function(err, message){
                    	db.query("delete from users where name in ('qwizardtestuser.1', 'qwizardtestuser.2', 'qwizardtestuser.3')", function(err, message) {
                    		if(err) {
						   		console.log(err);
						    }
	                        done();
                    	});
                    });
                });
            });
        });
    });


	it('/finished should return publish, results, title, id, sum(submitted) of closed quizzes', function(done){
		options.url = "http://localhost:3000/api/maker/manage/finished";
		request.get(options, function(err, response, body) {
			if (err) {
				console.log(err);
				done();
			} else {
				body = JSON.parse(body);
                assert.equal(body[0].publish, '2014-12-04T06:00:00.000Z');
                assert.equal(body[0].results, '2014-12-08T06:00:00.000Z');
                assert.equal(body[0].title, "Title");
				assert.equal(body[0].id, quizId);
            	assert.equal(body[0].employees, 2);
            	done();
			}
		});
	});

	it("/totalEmployees: should return total number of employees in db", function(done){
		options.url = "http://localhost:3000/api/maker/manage/totalEmployees";
		request.get(options, function(err, response, body) {
			if(err) {
				console.log(err);
				done();
			} else {
				body = JSON.parse(body);
				var correctTotal;
				db.query("SELECT COUNT(*) AS correctTotal FROM users", function(err, message) {
					if(err) {
						console.log(err);
						done();
					} else {
						correctTotal = message[0].correctTotal;
						assert.equal(body[0].totalEmployees, correctTotal);
						done();
					}
				});
			}
		});
	});

	it('/quizResultDetail should return publish, results, title, pointvalues, avg(points), sum(submitted) of closed quizzes', function(done){
		options.url = "http://localhost:3000/api/maker/manage/quizResultDetail/" + quizId;
        request.get(options, function(err, response, body) {
            if (err) {
                console.log(err);
                done();
            } else {
                body = JSON.parse(body);
                assert.equal(body[0].openDate, '2014-12-04T06:00:00.000Z');
                assert.equal(body[0].closeDate, '2014-12-08T06:00:00.000Z');
                assert.equal(body[0].title, "Title");
                assert.equal(body[0].pointvalues, '[5, 4]');
                assert.equal(body[0].questions, '[{\"type\":\"tf\",\"text\":\"TestQuestionText\",\"answers\":\"[\"\",\"\",\"\"]\",\"name\":\"TestQuestion\"},{\"type\":\"tf\",\"text\":\"TestQuestionText\",\"answers\":\"[\"\",\"\",\"\"]\",\"name\":\"TestQuestion\"}]');
                assert.equal(body[0].answers, '[[0], [0]]');
                assert.equal(body[0].avgPoints, 6);
                assert.equal(body[0].employees, 2);
                done();
            }
        });
	});

    it('/quizResultDetail should return information even if no users took the quiz', function(done) {
        db.query("delete from results where quizid=" + quizId, function(err, message) {
            options.url = "http://localhost:3000/api/maker/manage/quizResultDetail/" + quizId;
            request.get(options, function(err, response, body) {
                if (err) {
                    console.log(err);
                    done();
                } else {
                    body = JSON.parse(body);
                    assert.equal(body[0].openDate, '2014-12-04T06:00:00.000Z');
                    assert.equal(body[0].closeDate, '2014-12-08T06:00:00.000Z');
                    assert.equal(body[0].title, "Title");
                    assert.equal(body[0].pointvalues, '[5, 4]');
                    assert.equal(body[0].questions, '[{\"type\":\"tf\",\"text\":\"TestQuestionText\",\"answers\":\"[\"\",\"\",\"\"]\",\"name\":\"TestQuestion\"},{\"type\":\"tf\",\"text\":\"TestQuestionText\",\"answers\":\"[\"\",\"\",\"\"]\",\"name\":\"TestQuestion\"}]');
                    assert.equal(body[0].answers, '[[0], [0]]');
                    assert.equal(body[0].avgPoints, 0);
                    assert.equal(body[0].employees, 0);
                    done();
                }
            });
        });
    });

	// it('/allSubmittedAnswers should return submitted answers for a specific quiz', function(done){

	// });
    describe("Drafts API Call", function(done) {
        beforeEach(function(done) {
            var quiz = {
                id: 999999,
                title: "My Draft",
                questions: 'Some Collection'
            };

            var publishedQuiz = {
                id: 999998,
                title: "Published Quiz",
                questions: 'Published Collection',
                publish: "2015-07-08",
                results: "2015-07-09"
            };

            db.query("Insert into quizzes SET ?", quiz, function(err, message) {
                if(err) {
                    console.log(err);
                }
                db.query("Insert into quizzes SET ?", publishedQuiz, function(err, message) {
                    done();
                });
            });
        });

        it('Should grab our draft from the database', function(done) {
            options.url = "http://localhost:3000/api/maker/manage/drafts";
            request.get(options, function(err, response, body) {
                if (err || !body.length) {
                    console.log(err);
                    done();
                } else {
                    body = JSON.parse(body);
                    assert.ok(body[0].id == 999999);
                    assert.ok(body[0].title == "My Draft");
                    assert.ok(body[0].questions == "Some Collection");
                    done();
                }
            });
        });

        it('Should not grab only non-published quizzes', function(done) {
            options.url = "http://localhost:3000/api/maker/manage/drafts";
            request.get(options, function(err, response, body) {
                if (err || !body.length) {
                    console.log(err);
                    done();
                } else {
                    body = JSON.parse(body);
                    assert.ok(body.length == 1);
                    done();
                }
            });
        });
    });
});
DROP TABLE IF EXISTS emailTokens;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(40) NOT NULL UNIQUE,
	role INT NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE tokens (
	cookie VARCHAR(40) NOT NULL,
	userid INT NOT NULL,
	FOREIGN KEY (userid) REFERENCES users(id),
	PRIMARY KEY (cookie)
);

CREATE TABLE quizzes (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(40) NOT NULL,
	questions LONGTEXT NOT NULL,
	answers LONGTEXT NOT NULL,
	author INT,
	results date,
	publish date,
	pointvalues LONGTEXT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE results (
	quizid INT NOT NULL,
	userid INT NOT NULL,
    points INT,
    answers LONGTEXT NOT NULL,
    viewed INT NOT NULL DEFAULT 0,
    FOREIGN KEY (quizid) REFERENCES quizzes(id),
    FOREIGN KEY (userid) REFERENCES users(id),
    PRIMARY KEY (quizid, userid)
);

CREATE TABLE notifications(
	quizId INT NOT NULL,
	userID INT NOT NULL,
	typeID INT NOT NULL,
	PRIMARY KEY (quizId, userID)
);

CREATE TABLE emailTokens (
	id int,
	token varchar(50),
	PRIMARY KEY (token)
);
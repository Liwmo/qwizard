CREATE TABLE photoMatchStats (
	userId INT PRIMARY KEY,
	matches INT NOT NULL DEFAULT 0,
	FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO photoMatchStats(userId)
SELECT id FROM users;
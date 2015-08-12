ALTER TABLE results DROP FOREIGN KEY results_ibfk_2;
ALTER TABLE tokens DROP FOREIGN KEY tokens_ibfk_1;
ALTER TABLE photoMatchStats DROP FOREIGN KEY photoMatchStats_ibfk_1;
ALTER TABLE emailTokens DROP FOREIGN KEY emailTokens_ibfk_1;
ALTER TABLE notifications DROP FOREIGN KEY notifications_ibfk_1;

ALTER TABLE results ADD FOREIGN KEY (userid) REFERENCES users (id);
ALTER TABLE tokens ADD FOREIGN KEY (userid) REFERENCES users (id);
ALTER TABLE photoMatchStats ADD FOREIGN KEY (userid) REFERENCES users (id);
ALTER TABLE tokens DROP FOREIGN KEY tokens_ibfk_1;
ALTER TABLE results DROP FOREIGN KEY results_ibfk_2;
ALTER TABLE photoMatchStats DROP FOREIGN KEY photoMatchStats_ibfk_1;

ALTER TABLE results ADD FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE tokens ADD FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE photoMatchStats ADD FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE emailTokens ADD FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE notifications ADD FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE;
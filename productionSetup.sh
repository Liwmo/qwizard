sudo yum install nodejs
sudo yum install npm
sudo yum install mysql
sudo cp database/my.cnf /etc/my.cnf
sudo service mysqld start
npm install --production
npm run-script init-db
npm start
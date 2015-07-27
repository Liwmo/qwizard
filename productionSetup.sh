sudo yum install nodejs
sudo yum install npm
npm install forever -g

NODE_PATH=$(which node)

sudo yum install mysql
sudo yum install mysql-server
sudo cp database/my.cnf /etc/my.cnf
sudo service mysqld start
sudo mysql -u root < database/mysqlUser.mysql

npm install --production
npm run-script init-db

crontab productionCrontab.txt
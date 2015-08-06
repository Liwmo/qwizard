#!/bin/bash

#Install Dependencies
NODE_PATH=$(which node)
npm install --production

#Upgrade Database
$NODE_PATH node_modules/db-migrate/bin/db-migrate up --config database.json -e production

#Setup DailyJobs
crontab productionCrontab.txt

#Restart the web server
sudo /etc/init.d/qwizard/server.sh restart
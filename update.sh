#!/bin/bash


case "$1" in
    production)
		echo "Using production Git branch"
        git checkout production
		git pull
        ;;
    *)
        echo "Not pulling latest Git on current branch"
        ;;
esac

#Install Dependencies
NODE_PATH=$(which node)
npm install --production

#Upgrade Database
$NODE_PATH node_modules/db-migrate/bin/db-migrate up --config database.json -e prod

#Setup DailyJobs
crontab productionCrontab.txt

#Restart the web server
sudo /etc/init.d/qwizard/server.sh restart
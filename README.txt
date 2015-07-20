Install Documentation

For CentOS platform
---------------------
Install Node and npm:
	sudo yum install node
	sudo yum install npm

Install mysql:
	sudo yum install mysql
	You must have a root mysql account without a password

Pull the project from Gitlab, either download the zip and unpack or use:
	git clone https://gitlab.asynchrony.com/proj-1189/qwizard.git

Enter the project directory:
	cd qwizard

Install project dependencies using:
	npm install

Creating Database:
	npm init-db

Start Server:
	npm start
var fs = require('fs');
var path = require('path');

module.exports = function(employees, size, excludeIds){
	var data = {
		matchingClues: [],
		matchingAnswers: []
	};
	for(var i = 0; i < size; i++){
		var rand = Math.floor(Math.random() * employees.length);
		var picPath = path.join(__dirname, '../public/images/employees/' + employees[rand].id + ".jpg");
		while(data.matchingClues.indexOf(employees[rand].id) !== -1 || (excludeIds && excludeIds.indexOf(employees[rand].id) !== -1) || !(fs.existsSync(picPath))){
			picPath = path.join(__dirname, '../public/images/employees/' + employees[rand].id + ".jpg");
			rand = Math.floor(Math.random() * employees.length);
		}

		data.matchingClues.push(employees[rand].id);

		var name = employees[rand].name.split('.');
		name.forEach(function(e, i, a){
			a[i] = e[0].toUpperCase() + e.substr(1);
		});
		data.matchingAnswers.push(name.join(' '))
	}
	return data;
};
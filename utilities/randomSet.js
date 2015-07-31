module.exports = function(employees, size, excludeIds){
	var data = {
		matchingClues: [],
		matchingAnswers: []
	};
	for(var i = 0; i < size; i++){
		var rand = Math.floor(Math.random() * employees.length);
		while(data.matchingClues.indexOf(employees[rand].id) !== -1 || (excludeIds && excludeIds.indexOf(employees[rand].id) !== -1)){
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
var ldap = require('ldapjs-hotfix');

var tlsOptions = { 'rejectUnauthorized': false }
var client = ldap.createClient({
    url: 'ldaps://dc3-stl.schafer.lan:636',
    tlsOptions: tlsOptions
});

var username = 'proj-1189-bind';
var password = 'OEHss$4r$mHb^j';
var bindPath = 'CN='+ username +',OU=ServiceAccounts,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan';
var search = function(searchScope, opts, callback){
	client.bind(bindPath, password, function(err, ldapRes) {
	    if(err){
	    	console.log(err);
	    	console.log('there was an error binding.');
	    }else{
          	client.search(searchScope, opts, function (err, search) {
          		if(err){
          			console.log(err);
          			callback({error: err});
          		}else{
	          		var data = [];

			    	search.on('searchEntry', function (entry) {
			    		data.push(entry.object);
			    	});

			    	search.on('end', function(){
			    		callback(data);
	    				client.unbind(function(err) {if (err) console.log("You cannot leave the LDAP!!!!"); else console.log("Unbinding from the LDAP!")});
			    	});   			
          		}
		  	});
	    }
	});
};

module.exports = search;
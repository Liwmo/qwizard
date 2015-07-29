var ldap = require('ldapjs-hotfix');
var fs = require('fs');
var db = require('../database/db');

var tlsOptions = { 'rejectUnauthorized': false }
var client = ldap.createClient({
    url: 'ldaps://dc3-stl.schafer.lan:636',
    tlsOptions: tlsOptions
});

var username = 'proj-1189-bind';
var password = 'OEHss$4r$mHb^j';
var bindPath = 'CN='+ username +',OU=ServiceAccounts,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan';

client.bind(bindPath, password, function(err, ldapRes) {
    if(err){
    	console.log(err);
    	console.log('there was an error binding.');
    }else{
    	var opts = {
                filter: '(objectclass=user)',
                scope: 'sub',
                attributes: ['cn', 'displayName', 'thumbnailPhoto']
            };

              client.search('OU=Employees,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan', opts, function (err, search) {
			    search.on('searchEntry', function (entry) {
			      var user = entry.object;
			      console.log(user.displayName, !!user.thumbnailPhoto);
			    });

			    search.on('end', function(){
        			client.unbind(function(err) {if (err) console.log("You cannot leave the LDAP!!!!"); else console.log("Unbinding from the LDAP!")});
			    });
			  });
    }
});
var ldap = require('ldapjs-hotfix');

var tlsOptions = { 'rejectUnauthorized': false };

var username = 'proj-1189-bind';
var password = 'OEHss$4r$mHb^j';
var bindPath = 'CN='+ username +',OU=ServiceAccounts,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan';

var search = function(searchScope, opts, callback){
    var client = ldap.createClient({
        url: 'ldaps://dc3-stl.schafer.lan:636',
        tlsOptions: tlsOptions
    });

	client.bind(bindPath, password, function(err, ldapRes) {
	    if(err){
			callback([]);
		} else {
          	client.search(searchScope, opts, function (err, search) {
          		var data = [];
		    	search.on('searchEntry', function (entry) {
		    		data.push(convert(entry));
		    	});

                search.on('error', function(){
                    client.unbind(function(error) {                         
                        callback(data);
                    });
                });

    	    	search.on('end', function(result) {
	                client.unbind(function(error) {	    					
  				        callback(data);
  				    });
		    	});   			
		  	});
	    }
	});
}

module.exports = search;

function convert(entry) {
    var obj = {
        dn: entry.dn.toString(),
        controls: []
    };
    entry.attributes.forEach(function (a) {
        var item = a.buffers;
        if (item && item.length) {
            if (item.length > 1) {
                obj[a.type] = item.slice();
            } else {
                obj[a.type] = item[0];
            }
        } else {
            obj[a.type] = [];
        }
    });
    entry.controls.forEach(function (element, index, array) {
        obj.controls.push(element.json);
    });
    return obj;
}
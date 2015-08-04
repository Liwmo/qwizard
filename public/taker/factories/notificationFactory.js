app.factory("notificationFactory", ["$http", function($http){
    var self = this;
    var notifications = [];

    self.getNotifications = function(){
        return notifications;
    };

    var getText = function(data){
        if(data.typeID == 1){
            return data.title + " quiz is ready to take.";
        }else{
            return "Results from " + data.title + " quiz are available. View now >>";
        }
    };

    var getLink = function(data){
        if(data.typeID == 1){
            return '#/quiz/' + data.id;
        }else{
            return '#/results/' + data.id;
        }
    };

    self.refreshNotifications = function(callback) {
        $http.get('/api/notifications/').success(function(data){

            var tempNotifications = [];

            // Dont delete notifications that thank you for taking a quiz, as they aren't stored in the DB
            notifications.forEach(function(notification) {
                if(notification.link === "#/") {
                    notifications.push(notification);
                }
            });

            notifications = tempNotifications;

            for(var i = 0; i < data.length; i++){
                notifications.push({
                    text: getText(data[i]),
                    link: getLink(data[i]),
                    id: data[i].id,
                    type: data[i].typeID
                });
            }
            callback(notifications);
        });
    };

    self.addNotification = function(text, link){
        notifications.push({
            text: text,
            link: link
        });
    };

    self.removeNotification = function(notification, callback){
        $http.get('/api/notifications/remove/' + notification.id);
        notifications.splice(notifications.indexOf(notification), 1);
        callback();
    };

    return self;
}]);
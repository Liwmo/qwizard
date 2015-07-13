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

    self.refreshNotifications = function(callback) {
        notifications = [];
        $http.get('/api/notifications/').success(function(data){
            for(var i = 0; i < data.length; i++){
                notifications.push({
                    text: getText(data[i]),
                    link: "#/quiz/" + data[i].id,
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

    self.removeNotification = function(notification){
        $http.get('/api/notifications/remove/' + notification.id);
        notifications.splice(notifications.indexOf(notification), 1);
    };

    return self;
}]);
app.factory("notificationFactory", ["$http", function($http){
    var self = this;
    var notifications = [];

    self.getNotifications = function(){
        return notifications;
    };

    self.refreshNotifications = function(callback) {
        notifications = [];
        var done = false;
        $http.get('/api/notifications/results').success(function(data){
            for(var i = 0; i < data.length; i++){
                notifications.push({
                    text: "Results for " + data[i].title + " quiz have been released. View now >>",
                    link: "#/results/" + data[i].id,
                    type: 'result'
                });
            }
            callback(notifications);
        });
        $http.get('/api/notifications/available').success(function(data){
            for(var i = 0; i < data.length; i++){
                notifications.push({
                    text: data[i].title + " quiz is ready to take.",
                    link: "#/quiz/" + data[i].id,
                    type: 'avail'
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
        notifications.splice(notifications.indexOf(notification), 1);
    };

    return self;
}]);
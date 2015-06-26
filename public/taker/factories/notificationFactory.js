app.factory("notificationFactory", ["$http", function($http){
    var self = this;
    var notifications = [
        {
            text: "WWT Employee Handbook quiz is ready to take.",
            link: "#/quiz"
        },
        {
            text: "Results for Quiz 234 have been released. View now >>",
            link: "#/results"
        }
    ];

    self.getNotifications = function(){
        return notifications;
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
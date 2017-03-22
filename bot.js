const SlackBot = require('slackbots');

module.exports = function(params){
    var self = this;
	self.bot = null;
	self.connect = function(){
        self.bot = new SlackBot(params);
        self.bot.on('start', self.onStart);
        self.bot.on('message', self.onEvent);
    }

    self.onStart = function(){
        self.bot.on('message', self.onEvent);

        self.bot.postMessageToUser('charles_adel', 'meow!');

        self.bot.getUser(self.bot.self.name).then(function(user){
            self.user = user;
        });
    }

    self.onEvent = function(event){
        if(event.type == 'message')
            self.onMessage(event)
    }

    self.onMessage = function(event){
        console.log("USEEEEEEEEEEEEEEEEEERS");
        console.log(self.bot.getUser(event.user));

    }
}
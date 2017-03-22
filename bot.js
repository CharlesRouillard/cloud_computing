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

        /*self.bot.postMessageToUser('charles_adel', 'meow!');*/

        self.bot.getUser(self.bot.self.name).then(function(user){
            self.user = user;
        });
    }

    self.onEvent = function(event){
        console.log('############################################################');
        console.log(event);
        console.log('############################################################');
        //if type == message then self.onMessage(event)
    }

    self.onMessage = function(event){

    }
}
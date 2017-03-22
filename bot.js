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

        self.bot.getUser(self.bot.self.name).then(function(user){
            self.user = user;
        });
    }

    self.onEvent = function(event){
        if(event.type == 'message')
            self.onMessage(event)
    }

    self.onMessage = function(event){
        if(event.bot_id){
            console.log("MESSAGE FROM A BOT");
            if(event.bot_id != self.user.bot_id){
                //message d'un autre bot ue le notre

            }
        }
        else{
            //message d'un humain
            console.log("MESSAGE FROM A HUMAN");
            console.log(event);
            self.bot.postMessageToUser(event.username, 'Message quelconque');
        }

    }
}
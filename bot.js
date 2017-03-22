const SlackBot = require('slackbots');
var axios = require('axios');
var et = require('html-entities').AllHtmlEntities;

module.exports = function(params){
    var self = this;
	self.bot = null;
	self.connect = function(){
        self.bot = new SlackBot(params);
        self.bot.on('start', self.onStart);
        self.bot.on('message', self.onEvent);
    }

    self.onStart = function(){
        self.bot.getUser(self.bot.self.name).then(function(user){
            self.user = user;
        });


        setInterval(function(){
            axios.request({
                url: 'http://www.chucknorrisfacts.fr//api/get?data=tri:alea;nb:1;type:txt',
                method: 'GET'
            }).then(function(response){
                self.bot.postMessageToChannel('general', response.data[0].fact);
            }).catch(console.log);
        }, 20000);

    }

    self.onEvent = function(event){
        if(event.type == 'message' && event.text)
            self.onMessage(event)
    }

    self.onMessage = function(event){
        if(event.bot_id){
            console.log("MESSAGE FROM A BOT");
            if(self.user.profile.bot_id != event.bot_id){
                setTimeout(function(){
                    self.bot.postMessage(event.channel, 'Hey copain bot ! EL PUEBLO UNIDO JAMAS SERA VENCIDO !');
                },2000);
            }
        }
        else{
            //message d'un humain
            console.log("MESSAGE FROM A HUMAN");
            self.bot.postMessage(event.channel, 'EL PUEBLO UNIDO JAMAS SERA VENCIDO !');
        }

    }
}
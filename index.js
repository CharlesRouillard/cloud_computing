var Bot = require('./bot.js');
var express = require('express');

var bot = new Bot({
    token: process.env.SLACK_BOT_TOKEN,
    name: 'yolo_bot'
});

bot.connect();



var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

app.listen(process.env.PORT || 5000);
var Bot = require('./bot.js');

var bot = new Bot({
    token: process.env.SLACK_BOT_TOKEN,
    name: 'yolo_bot'
});

bot.connect();
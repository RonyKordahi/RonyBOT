const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
const {responses} = require("./responses");

// Initialize Discord Bot
const bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// confirms connection
bot.on('ready', (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// event listener for messages
bot.on('message', (user, userID, channelID, message, evt) => {

    if ((message.includes("┻") || message.includes("︵")) && userID !== "85534406369894400" && userID !== "937124780799324182") {
        
        let response = responses[Math.floor(Math.random() * responses.length)];
        response = response.replace("USERID", `${userID}`);

        bot.sendMessage({
            to: channelID,
            message: response
        })
    }
});
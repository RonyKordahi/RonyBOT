// discord.js

// const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const keep_alive = require('./keep_alive.js');
require("dotenv").config();

const { responses, winResponses } = require("./data/responses");
const { characters } = require("./data/characters");

// create new client
// const client = new Discord.Client();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// launch client
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// scans new message
client.on('message', (msg) => {

    // checks if message includes trigger characters
    const charTrigger = characters.some(char => {
            return msg.content.toLowerCase().includes(char);
    })

    if (
        charTrigger // character found
        && msg.author.id !== "85534406369894400" // Rony
        && msg.author.id !== "937124780799324182" // RonyBOT
    ) {
        // random response - toFixed to limit to 2 decimals, used for checking for a winner
        const random = Number(Math.random().toFixed(2));
        let response;
        
        if(random === 0.01) {
            response = winResponses[Math.floor(random * winResponses.length)];
        }
        else {
            response = responses[Math.floor(random * responses.length)];
        }
        
        response = response.replace("USERID", `${msg.author.id}`);

        // reply to user
        msg.reply(response);

        // delete message
        // msg.delete();

        // send message
        // msg.channel.send(response);
    }
});

// make sure this line is the last line
// login bot using token
client.login(process.env.token); 

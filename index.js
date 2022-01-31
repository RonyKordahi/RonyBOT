// discord.js

const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { responses } = require("./responses");
require("dotenv").config();

//create new client
// const client = new Discord.Client();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {

    if (
        (msg.content.includes("┻") || msg.content.includes("︵")) 
        && msg.author.id === "85534406369894400"
        && msg.author.id !== "937124780799324182"
    ) {
        let response = responses[Math.floor(Math.random() * responses.length)];
        response = response.replace("USERID", `${msg.author.id}`);

        msg.reply(response);
    }
});

//make sure this line is the last line
//login bot using token
client.login(process.env.token); 
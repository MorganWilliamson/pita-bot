require("dotenv").config();
const Discord = require("discord.js");
const { prefix } = require("./config.json");
const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

// Message handling: 
client.on("message", (msg) => {
    if (msg.content.startsWith(`${prefix}ping`)) {
        msg.channel.send("Pong!");
    } else if (msg.content.includes("beep")) {
        msg.channel.send("Boop!");
    } else if (msg.content === `${prefix}server`) {
        // Note: Discord API refers to servers as "guilds".
        msg.channel.send(
            `Server Name: ${msg.guild.name}
            \nCurrent Member Count: ${msg.guild.memberCount}
            \nServer Creation Date: ${msg.guild.createdAt}
            \nCurrent Region: ${msg.guild.region}
            `); 
    } else if (msg.content.startsWith(`${prefix}region`)) {
        msg.channel.send(`Current Region: ${msg.guild.region}`)
    }
});

client.login(process.env.token);

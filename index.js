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
    }
});

client.login(process.env.token);

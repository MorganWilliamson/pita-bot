require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PORT || 8000;

server.get("/", (req, res) => {
    res.send("Hello World!");
});

server.listen(port, () => {
    console.log(`Test server listening at http://localhost:${port} . . .`);
});

///////////////////////////

/// Discord.js ex:
// const Discord = require("discord.js");
// const client = new Discord.Client();

// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on("message", (msg) => {
//     if (msg.content === 'ping') {
//         msg.reply("Pong!");
//     }
// });

// client.login("token");

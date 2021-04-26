require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./config.json${file}`);
    
    // Set a new item in the Collection with the key as
    // the command name, and the value as the exported module.
    client.commands.set(command.name, command);
}


client.once("ready", () => {
    console.log("Pita is ready!");
});

// Message handling: 
client.on("message", (msg) => {
    /* 1). If the message doesn't start with the prefix or if the message is
            written by a bot, then ignore the message. (DRY) */
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    /* 2). Create an `args` variable that will slice off the prefix entirely, 
        remove the leftover whitespaces, then split it into an array by spaces. 
       
       3). Create a `command` variable (by calling `args.shift`), which will take
       the first element in the array and return it while ALSO removing it from the
       original array (so that you don't have a command name string inside the args
       array.)
    */
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        msg.channel.send("Pong!");
    } else if (command === "beep") {
        msg.channel.send("Boop!");
    }
});

client.login(process.env.token);

////////////////////////////////////////////

// } else if (command === "server") {
//     // Note: Discord API refers to servers as "guilds".
//     msg.channel.send(
//         `Server Name: ${msg.guild.name}
//         \nCurrent Member Count: ${msg.guild.memberCount}
//         \nServer Creation Date: ${msg.guild.createdAt}
//         \nCurrent Region: ${msg.guild.region}
//         `); 
// } else if (command === "region") {
//     msg.channel.send(`Current Region: ${msg.guild.region}`)
// } else if (command === 'args-info') {
//     if (!args.length) {
//         return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
// }   else if (args[0] === 'foo') {
//     return msg.channel.send('bar');
// }
//     msg.channel.send(`First argument: ${args[0]}`);
//     msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
// } else if (command === "avatar") {
//     // Returning a link to a user's avatar, no image embedding? 
//     if (!msg.mentions.users.size) {
//         return msg.channel.send(`Your Avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true})}>`);
//     }
    
//     const avatarList = msg.mentions.users.map((user) => {
//         return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true})}>`;
//     });

//     msg.channel.send(avatarList);
// } else if (command === "prune") {
//     // Deleting messages (range of 1 - 99). 
//     const amount = parseInt(args[0]) + 1;

//     if (isNaN(amount)) {
//         return msg.reply("That doesn't seem to be a valid number!");
//     } else if (amount <= 1 || amount > 100) {
//         return msg.reply("Please input a number between 1 and 99.");
//     } 

//     // bulkDelete normally can't delete messages older than 2 weeks.
//     msg.channel.bulkDelete(amount, true).catch((err) => {
//         console.error(err);
//         msg.channel.send("There was an error trying to prune messages in this channel.");
//     });
//     // Double-check the math on this one. 
//     msg.channel.send(`${amount - 1} message(s) deleted.`);
// };
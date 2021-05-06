require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();
// commandFolders returns an array of all subfolder names in the commands folder
const commandFolders = fs.readdirSync("./commands");

const commandFiles = fs.readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
    
        // Set a new item in the Collection with the key as
        // the command name, and the value as the exported module.
        client.commands.set(command.name, command);
    };
};


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
    const commandName = args.shift().toLowerCase();

    // Check that the command exists:
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    // Handling: user uses command without args, but command requires args
    if (command.args && !args.length) {
        let reply = msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        };

        return msg.channel.send(reply);
    };

    try {
        command.execute(msg, args);
    } catch (err) {
        console.error(err);
        msg.reply("There was an error executing that command!");
    };
});

client.login(process.env.token);

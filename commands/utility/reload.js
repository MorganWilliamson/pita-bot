const fs = require("fs");

module.exports = {
    name: "reload",
    description: "Reloads a given command.",
    args: true,
    aliases: ["r", "restart"],
    execute(msg, args) {
        const commandName = args[0].toLowerCase();
        const command = msg.client.commands.get(commandName) 
            || msg.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return msg.channel.send(`There's no command with name or alias \`${commandName}\`, ${msg.author}!`)
        }
    },
};
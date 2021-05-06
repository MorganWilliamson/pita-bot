const { prefix } = require("../../config.json");

module.exports = {
    name: "help",
    description: "List all available commands or info about a specific command.",
    aliases: ["commands"],
    usage: "[command name]",
    cooldown: 5,
    execute(msg, args) {
        const data = [];
        const { commands } = msg.client;

        // If there's not a specific command provided...
        if (!args.length) {
            // ... return a list of all commands...
            data.push("Here's a list of all available commands:");
            data.push(commands.map((command) => command.name).join(", "));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            // ... and try to DM that list to the author!
            return msg.author.send(data, { split: true })
                .then(() => {
                    if (msg.channel.type === "dm") return;
                    msg.reply("I've sent you a message with a list of my commands!");
                })
                .catch((err) => {
                    console.error(`Couldn't send help DM to ${msg.author.tag}.\n`, err);
                    msg.reply("I ran into an issue while trying to DM you!");
                });
            }
        
        // Otherwise: 
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            return msg.reply("Invalid command provided.")
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        msg.channel.send(data, { split: true });
    },
};
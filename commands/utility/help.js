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
            // ... return a list of all commands.
            data.push("Here's a list of all available commands:");
            data.push(commands.map((command) => command.name).join(", "));
            data.push(`\nYou can send\`${prefix}help [command name]\` to get info on a specific command!`);

            return msg.author.send(data, { split: true })
                .then(() => {
                    if (msg.channel.type === "dm") return;
                    msg.reply("I've sent you a message with a list of my commands!");
                })
                .catch((err) => {
                    console.err(`Couldn't send help DM to ${msg.author.tag}.\n`, err);
                    msg.reply("I ran into an issue while trying to DM you!");
                });
        }
    },
};
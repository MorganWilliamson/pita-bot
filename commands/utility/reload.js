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

        const commandFolders = fs.readdirSync("./commands");
        const folderName = commandFolders.find((folder) => 
            fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));
        
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            msg.client.commands.set(newCommand.name, newCommand);
            msg.channel.send(`Command \`${newCommand.name}\` was successfully reloaded!`);
        } catch (err) {
            console.error(err);
            msg.channel.send(`There was an error while reloading a command, \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};
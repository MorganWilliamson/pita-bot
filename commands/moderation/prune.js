module.exports = {
    name: "prune", 
    aliases: ["delete", "erase"],
    description: "Removes a specified number of messages.",
    execute(msg, args) {
        // Zero-based numbering.
        const amount = parseInt(args[0]) + 1;
        
        // Check number:
        if (isNaN(amount)) {
            return msg.reply("That doesn't seem to be a valid number!");
        } else if (amount <= 1 || amount > 100) {
            return msg.reply("Please input a number between 1 and 99.");
        };

        msg.channel.bulkDelete(amount, true).catch((err) => {
            console.error(err);
            msg.channel.send("There was an error trying to prune messages in this channel.");
        });

        msg.channel.send(`${amount - 1} message(s) deleted.`);

    },
};
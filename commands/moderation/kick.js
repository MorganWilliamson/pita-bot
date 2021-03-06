module.exports = {
    name: "kick",
    description: "Removes a mentioned user from the server.", 
    aliases: ["remove"],
    guildOnly: true,
    permissions: "KICK_MEMBERS",
    execute(msg, args) {
        // Check that at least one user is mentioned
        if (!msg.mentions.users.size) {
            return msg.reply("You need to mention a user in order to kick them.");
        };

        // Set the first user to taggedUser
        const taggedUser = msg.mentions.users.first();

        // Parrot the user and action
        msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    },
};
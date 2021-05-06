module.exports = {
    name: "avatar",
    aliases: ["icon", "pfp"],
    description: "Sends user or mentioned user's avatar.",
    execute(msg) {
        if (!msg.mentions.users.size) {
            return msg.channel.send(`Your Avatar: <${msg.author.displayAvatarURL({dynamic: true})}>`);
        };

        const avatarList = msg.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({dynamic: true})}>`;
        });

        msg.channel.send(avatarList);
    },
};
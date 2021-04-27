module.exports = {
    name: "avatar",
    description: "Sends user/mentioned user's avatar.",
    execute(msg, args) {
        if (!msg.mentions.users.size) {
            msg.channel.send(`Your Avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true})}>`);
        };

        const avatarList = msg.mentions.users.map((user) => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true})}>`;
        });

        msg.channel.send(avatarList);
    },
};
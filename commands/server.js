module.exports = {
    name: "server",
    description: "Server",
    execute(msg, args) {
        msg.channel.send(
                `Server Name: ${msg.guild.name}
                 \nCurrent Member Count: ${msg.guild.memberCount}
                 \nServer Creation Date: ${msg.guild.createdAt}
                 \nCurrent Region: ${msg.guild.region}
                 `);
    },
};
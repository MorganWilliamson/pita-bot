module.exports = {
    name: "ping",
    description: "Ping!",
    cooldown: 5, // Cooldown is measured in seconds
    execute(msg, args) {
        msg.channel.send("Pong.");
    },
};
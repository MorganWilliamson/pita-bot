module.exports = {
    name: "ping",
    description: "Ping Pita, to make sure it's up and running.",
    cooldown: 5, // Cooldown is measured in seconds
    execute(msg, args) {
        msg.channel.send("Pong!");
    },
};
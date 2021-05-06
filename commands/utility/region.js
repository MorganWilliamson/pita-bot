module.exports = {
    name: "region",
    description: "Returns the current server region.",
    execute(msg, args) {
        msg.channel.send(`Current Region: ${msg.guild.region}`)
    },
};
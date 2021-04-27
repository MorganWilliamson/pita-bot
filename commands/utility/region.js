module.exports = {
    name: "region",
    description: "Sends current server region.",
    execute(msg, args) {
        msg.channel.send(`Current Region: ${msg.guild.region}`)
    },
};
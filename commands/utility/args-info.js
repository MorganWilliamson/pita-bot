module.exports = {
    name: "args-info",
    description: "Information about the arguments provided.",
    args: true,
    execute(msg, args) {
        if (args[0] === "fizz") {
            return msg.channel.send("bang");
        }

        msg.channel.send(`Arguments: ${args}\nArgument(s) length: ${args.length}`);
    },
};
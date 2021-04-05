const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));


for (let file of commandFiles) {
    const command = require(`../src/commands/test.js`);
    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log("BasedBot up and running")
})

client.on("message", (msg) => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
    let commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    command.execute(msg);
})

client.login(config.token).catch(err => console.error(err));
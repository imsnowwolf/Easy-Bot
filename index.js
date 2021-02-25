const fs = require("fs");
const { Client, Collection } = require('discord.js'); 
const { TOKEN, PREFIX } = require('./config');

const client = new Client(); 
client.commands = new Collection();

const loadCommands = (dir = "./commands/") => {
    fs.readdirSync(dir).forEach(dirs => {
    const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const fileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(fileName.help.name, fileName);
        }
    })
    console.log(`✅ ${client.commands.size} commandes chargées !`);
}

loadCommands()

client.on("ready", () => { 
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("!help", { type: 3});
});

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
   
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
    if(!command) return;
   
    client.commands.get(commandName).execute(client, message, args);
   });

client.login(TOKEN);
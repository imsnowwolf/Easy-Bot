const { MessageEmbed } = require('discord.js');
const emojis = require('../../emojis.json');

module.exports = {
    execute(client, message, args) {
        categories = [];
        const commands = client.commands;

        commands.forEach(cmd => {
            if(!categories.includes(cmd.help.category)) {
                categories.push(cmd.help.category)
            }
        });
    
        const embed = new MessageEmbed()
            .setColor("#187bde")
            .setTitle("Voici la liste de commandes")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(">> Préfix du bot -> **`!`**")

        categories.forEach(cat => {
            const tCommands = commands.filter(cmd => cmd.help.category === cat);
            embed.addField(`${emojis.categories[cat]} ${cat}`, `${tCommands.map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
        })

        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "help",
    description: "Affiche la liste des commandes",
    category: "Général"
}
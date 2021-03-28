const Discord = require('discord.js');

module.exports = {
    name: 'weryfikacja',
    aliases: [],
    execute(message, args, client) {
        if (message.member.user.id === "443657012769849366" || "476122334747557904") {
            const embed = new Discord.MessageEmbed()
                .setTitle('Weryfikacja')
                .setDescription('Dodaj reakcje  :white_check_mark:  aby siebie zweryfikować!')
                .setColor('GREEN')

            message.delete()
            message.channel.send(embed).then(msg => {msg.react('✅')})
        } else {
            return
        }
    }
}
const Discord = require('discord.js');

module.exports = {
    name: 'nsfw',
    aliases: [],
    execute(message, args, client) {
        if (message.member.user.id === "443657012769849366" || "476122334747557904") {
            const embed = new Discord.MessageEmbed()
                .setTitle('NSFW')
                .setDescription('Dodaj reakcje 🔞 aby otrzymać dosęp do kanału 18+')
                .setColor('RED')

            message.delete()
            message.channel.send(embed).then(msg => {msg.react('🔞')})
        } else {
            return
        }
    }
}
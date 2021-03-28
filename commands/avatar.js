const Discord = require('discord.js')

module.exports = {
    name: 'avatar',
    usage: 'avatar [@member/id]',
    aliases: ['av', 'pfp'],
    execute(message, args) {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        const embed = new Discord.MessageEmbed()
            .setDescription(`Avatar użytkownika \`${target.user.tag}\``)
            .setImage(target.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setColor(target.displayHexColor || '00ffcc')

        return message.channel.send(embed)
    }
}
const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'userinfo',
    usage: 'userinfo [@member/id]',
    aliases: ['user', 'profile', 'info'],
    execute(message, args) {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        const roles = target.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        const creationdate = moment.utc(target.user.createdAt).format("DD/MM/YYYY")
        const joindate = moment.utc(target.joinedAt).format("DD/MM/YYYY")

        let y = Date.now() - target.user.createdAt
        let x = Date.now() - target.joinedAt

        const userfor = Math.floor(y / 86400000)
        const serverfor = Math.floor(x / 86400000)

        const nick = target.nickname || 'None'

        const embed = new Discord.MessageEmbed()
            .setDescription(`Informacje o ${target}`)
            .setColor(target.displayHexColor || '99ff33')
            .addFields(
                {
                    name: 'Główne informacje',
                    value: `> **Nazwa:** ${target.user.username}\n> **Tag:** ${target.user.discriminator}\n> **ID:** ${target.id}\n> **Nickn:** ${nick}\n> **Status:** ${target.user.presence.status}`
                },
                {
                    name: 'Informacje o koncie',
                    value: `> **Konto stworzone:** ${creationdate}\n> **Użytkownik Discord'a przez:** ${userfor} dni\n> **Dołączył do serwera:** ${joindate} (${serverfor} dni temu)`
                },
                {
                    name: 'Informacje o rolach',
                    value: `> **Liczba ról:** ${roles.length}\n> **Role:** ${roles.length < 50 ? roles.join(', ') : roles.length > 50 ? this.client.utils.trimArray(roles) : 'brak'}`
                }
                
            )

        return message.channel.send(embed)
    }
}
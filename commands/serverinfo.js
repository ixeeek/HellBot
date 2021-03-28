const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    usage: 'serverinfo',
    aliases: ['server', 'guild', 'guildinfo'],
    execute(message, args) {
        const creationdate = moment.utc(message.guild.createdAt).format("DD/MM/YYYY");

        let y = Date.now() - message.guild.createdAt;
        const joined = Math.floor(y / 86400000);

        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;

        const embed = new Discord.MessageEmbed()
            .setDescription(`Informacje o serwerze`)
            .setColor('99ff99')
            .setThumbnail(message.guild.iconURL())
            .addFields(
                {
                    name: 'Główne informacje',
                    value: `> **Nazwa:** ${message.guild.name}\n> **ID:** ${message.guild.id}\n> **Region:** ${message.guild.region}\n> **Stworzony:** ${creationdate} (${joined} dni temu)`
                },
                {
                    name: 'Informacje o użytkowanikach',
                    value: `> **Wszyscy użytkownicy:** ${message.guild.memberCount}\n> **Ludzie:** ${members.filter(member => !member.user.bot).size}\n> **Boty:** ${members.filter(member => member.user.bot).size}`
                },
                {
                    name: 'Informacje o kanałach',
                    value: `> **Wszystkie kanały:** ${channels.filter(channel => channel.type === 'text').size + channels.filter(channel => channel.type === 'voice').size}\n> **Kanały tekstowe:** ${channels.filter(channel => channel.type === 'text').size}\n> **Kanały głosowe:** ${channels.filter(channel => channel.type === 'voice').size}`
                },
                {
                    name: 'Inne informacje',
                    value: `> **Liczba ról:** ${message.guild.roles.cache.size - 1}\n> **Właściciel serwera:** <@${message.guild.owner.id}>`
                }
            )

            return message.channel.send(embed)
    }
}
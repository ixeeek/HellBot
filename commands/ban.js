const moment = require('moment');
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'ban',
    usage: 'ban <@member/id> [powód]',
    execute(message, args) {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('Nie masz permisji do użycia tej komendy!')
        }

        if (!target) {
            return message.reply(`Podaj prawidłowego użytkownika!\nPoprawne użycie komendy: \`${module.exports.usage}\``)
        }

        if (target.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply(`Nie możesz zbanować kogoś z tą samą lub wyższą rolą niż ty!`)
        }

        if (target.roles.highest.position >= message.guild.me.roles.highest.position){
            return message.reply('Bot nie może zbanować użytkownika z taką samą lub wyższą rolą!')
        }

        if (target.id === message.member.id){
            return message.reply('Nie możesz zbanować samego/ej siebie!')
        }

        const bantime = moment().format('DD.MM.YYYY o HH:mm');

        const log = new Discord.MessageEmbed()
            .setTitle(`BAN - ${bantime}`)
            .addFields(
                {name:'Zbanowany', value:`${target.user.tag}`},
                {name:'Moderator', value:`${message.member.user.tag}`},
                {name:'Powód', value:`${reason || 'nie podano'}`}
            )
        
        target.ban({
            reason: `${reason} | Moderator: ${message.member.user.tag}`
        }).catch(err => {
            const embed = new Discord.MessageEmbed()
                .setTitle('ERROR!')
                .setDescription(`\`\`\`${err}\`\`\``)
                .setColor('ff0000')

            message.channel.send(embed)
            return
        })


        message.delete()
        message.guild.channels.cache.get(config.logiid).send(log)


        const embed = new Discord.MessageEmbed()
            .setDescription(`:white_check_mark: Pomyślnie zbanowano **${target.user.tag}**`)
            .setColor('DARK_RED')
            .setTimestamp()
        
        message.channel.send(embed);


        message.guild.channels.cache.get(config.membercountid).edit({
            name: `👥︱Użytkownicy: ${message.guild.memberCount}`
        })
    }
}
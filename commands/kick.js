const Discord = require('discord.js');
const config = require('../config.json');
const moment = require('moment');

module.exports = {
    name: 'kick',
    usage: 'kick <@member/id> [powód]',
    execute(message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const rsn = args.slice(1).join(' ');

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('Nie masz permisji, do użycia tej komendy!')
        }

        if (!target) {
            return message.reply(`Podaj prawidłowego użytkownika!\nPoprawne użycie komendy: \`${module.exports.usage}\``)
        }

        if (target.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply(`Nie możesz wyrzucić kogoś z tą samą lub wyższą rolą niż ty!`)
        }

        if (target.roles.highest.position >= message.guild.me.roles.highest.position){
            return message.reply('Bot nie może wyrzucić użytkownika z taką samą lub wyższą rolą!')
        }

        if (target.id === message.member.id){
            return message.reply('Nie możesz wyrzucić samego/ej siebie!')
        }


        const kicktime = moment().format('DD.MM.YYYY o HH:mm');

        const log = new Discord.MessageEmbed()
            .setTitle(`KICK - ${kicktime}`)
            .addFields(
                {name:'Wyrzucony', value:`${target.user.tag}`},
                {name:'Moderator', value:`${message.member.user.tag}`},
                {name:'Powód', value:`${rsn || 'nie podano'}`}
            )

        message.delete()
        message.guild.channels.cache.get(config.logiid).send(log)     

        if(!rsn){
            const embed = new Discord.MessageEmbed()
                .setDescription(`**:white_check_mark: \`${target.user.tag}\` został wyrzucony!**`)
                .setColor('DARK_GOLD')

            message.channel.send(embed)
        }else{
            const embed = new Discord.MessageEmbed()
                .setDescription(`**:white_check_mark: \`${target.user.tag}\` został wyrzucony z powodem \`${rsn}\`**`)
                .setColor('DARK_GOLD')

            message.channel.send(embed)           
        }

        reason = `${rsn} | Modeator: ${message.member.user.tag}`;
        target.kick(reason)

        message.guild.channels.cache.get(config.membercountid).edit({
            name: `👥︱Użytkownicy: ${message.guild.memberCount}`
        })
    }
}
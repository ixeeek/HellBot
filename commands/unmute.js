const Discord = require('discord.js');
const moment = require('moment');
const config = require('../config.json');

module.exports = {
    name: 'unmute',
    usage: 'unmute <@member/id>',
    execute(message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let role = message.guild.roles.cache.find(role => role.name === "Muted");

        if(!message.member.hasPermission('KICK_MEMBERS')){
            return message.reply('Nie masz permisji do użycia tej komendy!')
        }

        if (!target) {
            return message.reply(`Podaj prawidłowego użytkownika!\nPoprawne użycie komendy: \`${module.exports.usage}\``)
        }

        if (target.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply(`Nie możesz odmutować kogoś z tą samą lub wyższą rolą niż ty!`)
        }

        if (target.roles.highest.position >= message.guild.me.roles.highest.position){
            return message.reply('Bot nie może odmutować użytkownika z taką samą lub wyższą rolą!')
        }

        if (target.id === message.member.id){
            return message.reply('Nie możesz odmutować samego/ej siebie!')
        }

        if(!target.roles.cache.has(role.id)){
            return message.reply('Ten użytkownik nie jest zmutowany!')
        }

        const mutetime = moment().format('DD.MM.YYYY o HH:mm');

        const log = new Discord.MessageEmbed()
            .setTitle(`UNMUTE - ${mutetime}`)
            .addFields(
                {name:'Odmutowany', value:`${target.user.tag}`},
                {name:'Moderator', value:`${message.member.user.tag}`},
            )

        message.guild.channels.cache.get(config.logiid).send(log)

        message.delete()
        const embed = new Discord.MessageEmbed()
            .setDescription(`:white_check_mark: Pomyślnie usunięto wyciszenie dla ${target}`)
            .setColor('LUMINOUS_VIVID_PINK')
            .setTimestamp()

        reason = `Moderator: ${message.member.user.tag}`;
        target.roles.remove(role.id, reason)
        message.channel.send(embed)
    }
}
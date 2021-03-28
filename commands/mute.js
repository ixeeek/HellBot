const Discord = require('discord.js');
const config = require('../config.json');
const ms = require('ms');
const moment = require('moment');

module.exports = {
    name: 'mute',
    usage: 'mute <@member/id> <czas/perm> [powód]',
    execute(message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const rsn = args.slice(2).join(' ');
        const duration = args[1];
        let role = message.guild.roles.cache.find(role => role.name === "Muted");

        if(!message.member.hasPermission('KICK_MEMBERS')){
            return message.reply('Nie masz permisji do użycia tej komendy!')
        }

        if (!target) {
            return message.reply(`Podaj prawidłowego użytkownika!\nPoprawne użycie komendy: \`${module.exports.usage}\``)
        }

        if (target.roles.highest.position >= message.member.roles.highest.position) {
            return message.reply(`Nie możesz zmutować kogoś z tą samą lub wyższą rolą niż ty!`)
        }

        if (target.roles.highest.position >= message.guild.me.roles.highest.position){
            return message.reply('Bot nie może zmutować użytkownika z taką samą lub wyższą rolą!')
        }

        if(!duration){
            return message.reply(`Podaj czas mute'a!\nPoprawne użycie komendy: \`${module.exports.usage}\``)
        }

        if (target.id === message.member.id){
            return message.reply('Nie możesz zmutować samego/ej siebie!')
        }

        if(target.roles.cache.has(role.id)){
            return message.reply('Ten użytkownik jest już zmutowany!')
        }

        message.delete()

        const userembed = new Discord.MessageEmbed()
            .setDescription(`Zostałeś wyciszony na \`hellup.pl\``)
            .setColor('DARK_AQUA')
            .addFields(
                {name: 'Powód', value: `${rsn || 'Nie podano'}`},
                {name: 'Moderator', value: `${message.member.user.tag}`},
                {name: 'Czas', value: `${duration}`}
            )
        
            const mutetime = moment().format('DD.MM.YYYY o HH:mm');

            const log = new Discord.MessageEmbed()
                .setTitle(`MUTE - ${mutetime}`)
                .addFields(
                    {name:'Zmutowany', value:`${target.user.tag}`},
                    {name:'Moderator', value:`${message.member.user.tag}`},
                    {name:'Powód', value:`${rsn || 'nie podano'}`},
                    {name: 'Czas', value: `${duration}`}
                )
            
            message.guild.channels.cache.get(config.logiid).send(log)


        if(!rsn){
            if (duration === "perm"){
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**:white_check_mark: \`${target.user.tag}\` został permanentnie wyciszony!**`)
                    .setColor('AQUA')
            
                message.channel.send(embed)
            }else{
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**:white_check_mark: \`${target.user.tag}\` został tymczasowo wyciszony na \`${duration}\`**`)
                    .setColor('AQUA')
            
                message.channel.send(embed)
            }
        }else{
            if (duration === "perm"){
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**:white_check_mark: \`${target.user.tag}\` został permanentnie wyciszony z powodem \`${rsn}\`**`)
                    .setColor('AQUA')
            
                message.channel.send(embed)
            }else{
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**:white_check_mark: \`${target.user.tag}\` został tymczasowo wyciszony na \`${duration}\` z powodem \`${rsn}\`**`)
                    .setColor('AQUA')
            
                message.channel.send(embed)
            }
        }

        reason = `${rsn || 'nie podano'} | Moderator: ${message.member.user.tag} | Czas: ${duration}`;
        if(duration === 'perm'){
            target.roles.add(role.id, reason)
            target.send(userembed).catch(() => {return})
        }else{
            target.roles.add(role.id, reason)
            target.send(userembed).catch(() => {console.log('message wasnt send')})
            setTimeout(() => {
                target.roles.remove(role.id)
            }, ms(duration))
        }
    }
}
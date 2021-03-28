const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'warnings',
    aliases: ['warns'],
    usage: 'warnings <@member>',
    async execute(message, args) {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const number = db.fetch(`number.${target.id}.${message.guild.id}`);
        const warnInfo = db.fetch(`info.${target.id}.${message.guild.id}`);

        if(!number || !warnInfo || warnInfo == []){
            return message.reply('Użytkownik nie ma żadnych ostrzeżeń')
        }

        const warnembed = new Discord.MessageEmbed()
            .setColor(message.guild.members.cache.get(target.id).roles.highest.color)
            .setTitle(`Ostrzeżenia użytkownika ${target.user.tag}`)

        for(let warnings of warnInfo){
            let mod = warnings.moderator
            let reason = warnings.reason
            

            warnembed.addField(`\u200B`, `**Moderator:** \`${mod}\`\n**Powód:** \`${reason}\`\n**ID warna:** \`${warnings.id}\``,true)
        }

        message.channel.send(warnembed) 
    }
}
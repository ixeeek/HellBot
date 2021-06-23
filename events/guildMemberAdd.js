const Discord = require('discord.js');
const moment = require('moment');
const config = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    execute(member){
        let i = Date.now() - member.user.createdAt;
        const userfor = Math.floor(i / 3600000);

        const joindate = moment().format('HH:mm (DD/MM/YY)')
        const embed = new Discord.MessageEmbed()
            .setDescription(`Witaj ${member}! Jest nas już **${member.guild.memberCount}**!`)
            .setColor('00ff00')
            .setFooter('Zapoznaj się z regulaminem, i leć popisać na chat!')
        member.guild.channels.cache.get(config.welcomeid).send(embed)
        member.guild.channels.cache.get(config.membercountid).edit({
            name: `👥︱Użytkownicy: ${member.guild.memberCount}`
        })  
    }
}
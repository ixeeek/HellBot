const Discord = require('discord.js');
const moment = require('moment');
const config = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    execute(member){
        let i = Date.now() - member.user.createdAt;
        const userfor = Math.floor(i / 86400000);

        if (userfor <= 7) {
            const log = new Discord.MessageEmbed()
                .setDescription(`\`${member.user.tag}\` - \`${member.user.id}\` został automatycznie zbanowany, ponieważ jego konto jest młodsze niż 7 dni!`)

            const user = new Discord.MessageEmbed()
                .setDescription('Zostałeś zbanowany z tego serwera, ponieważ twoje konto jest młodsze niż 7 dni! Jeżeli twoje konto ma już 7 dni, a Ty chcesz unbana\nZapraszmy do kontaktu: support@hellup.pl')
                .setFooter('Pozdrawiamy, zespół hellup.pl')

            member.send(user).catch(() => {
                console.error('Disabled dms? Blocked bot?')
            }).then(() => {
                member.ban({
                    reason: '[AUTOBAN] Konto mlodsze niz 7 dni'
                }).then(() => {
                    member.guild.channels.cache.get(config.logiid).send(log)
                })            
            })

        } else {
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
}
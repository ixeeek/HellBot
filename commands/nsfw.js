const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'nsfw',
    aliases: [],
    execute(message, args, client) {
        if (message.member.user.id === "443657012769849366" || "476122334747557904") {
            const embed = new Discord.MessageEmbed()
                .setTitle('NSFW')
                .setDescription('Dodaj reakcje 🔞 aby otrzymać dosęp do kanału 18+')
                .setColor('RED')

            message.delete()
            message.channel.send(embed).then(msg => {
                msg.react('🔞')

                var msgid = msg.id;

                const file=require('../rolemenu.json');
    
                file.nsfw=msgid;
    
                const log = new Discord.MessageEmbed()
                    .setDescription(`Zmieniono ID wiadomosci do nsfw na: \`${msgid}\``)
                    
                fs.writeFile('rolemenu.json', JSON.stringify(file, null, 2), function writeJSON(err) {
                    if (err) return console.log(err);
                    message.guild.channels.cache.get(config.logiid).send(log)
                  });
            })
        } else {
            return
        }
    }
}
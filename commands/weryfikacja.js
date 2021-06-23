const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: 'weryfikacja',
    aliases: [],
    execute(message, args, client) {
        if (message.member.user.id === "443657012769849366" || "476122334747557904") {
            const embed = new Discord.MessageEmbed()
                .setTitle('Weryfikacja')
                .setDescription('Dodaj reakcje  :white_check_mark:  aby otrzymać dostęp do serwera!')
                .setColor('GREEN')

            message.delete()
            message.channel.send(embed).then(msg => {
                msg.react('✅')
                var msgid = msg.id;

                const file=require('../rolemenu.json');
    
                file.weryfikacja=msgid;
    
                const log = new Discord.MessageEmbed()
                    .setDescription(`Zmieniono ID wiadomosci do weryfikacja na: \`${msgid}\``)
                    
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
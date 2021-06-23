const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');

module.exports = {
    name: 'ogloszeniamc',
    aliases: [],
    async execute(message, args) {
        if (!message.member.user.id === "443657012769849366" || !message.member.user.id === "476122334747557904") {
            return
        }

        const role = new Discord.MessageEmbed()
            .setTitle('Ogłoszenia Minecraft')
            .setDescription('Dodaj reakcje 👁 aby dostawać powiadomienia o zmianach na serwerze Minecraft')
            .setColor('BLUE')
        message.delete()
        message.channel.send(role)
            .then(msg => {
                msg.react('👁')

                var msgid = msg.id;

                const file=require('../rolemenu.json');
    
                file.ogloszeniamc=msgid;
    
                const log = new Discord.MessageEmbed()
                    .setDescription(`Zmieniono ID wiadomosci do ogloszeniamc na: \`${msgid}\``)
                    
                fs.writeFile('rolemenu.json', JSON.stringify(file, null, 2), function writeJSON(err) {
                    if (err) return console.log(err);
                    message.guild.channels.cache.get(config.logiid).send(log)
                  });
            });
    }
}
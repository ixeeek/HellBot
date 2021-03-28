const Discord = require('discord.js');
const config = require('../config.json')

module.exports = {
    name: 'role',
    aliases: [],
    async execute(message, args) {
        if (!message.member.user.id === "443657012769849366" || !message.member.user.id === "476122334747557904") {
            return
        }

        const role = new Discord.MessageEmbed()
            .setTitle('Role do wyboru')
            .setDescription('\n1️⃣ - <@&759421223930298418>\n\n2️⃣ - <@&756650341050744832>\n\n3️⃣ - <@&762431579234238475>\n\n4️⃣ - <@&773504637709713439>')
            .setColor('PURPLE')
            //1 anime //2 tryhard //3 gamer //4 dj
        message.delete()
        message.channel.send(role)
            .then(msg => {
                msg.react('1️⃣')
                msg.react('2️⃣')
                msg.react('3️⃣')
                msg.react('4️⃣')
            });  
    }
}
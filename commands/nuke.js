const Discord = require('discord.js');

module.exports = {
    name: 'nuke',
    execute(message, args){
        if(!message.member.hasPermission('MANAGE_CHANNELS')){
            return message.reply('Nie masz permisji do użycia tej komendy!')
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(`**:white_check_mark: Kanał \`${message.channel.name}\` został wyczyszczony!**`)
            .setColor('BLUE')

        const log = new Discord.MessageEmbed()
            .setTitle('NUKE')
            .addFields(
                {name: 'Kanał', value: `${message.channel.name}`},
                {name: 'Moderator', value: `${message.member.user.tag}`}
            )
            
        message.guild.channels.cache.get(config.logiid).send(log)
        
        message.channel.clone({
            reason: `Wyczyszczono przez: ${message.member.user.tag}`
        }).then(channel => {
            channel.setPosition(message.channel.position)
            channel.send(embed)
        })
        setTimeout(function () {
            message.channel.delete({
                reason: `Wyczyszczono przez: ${message.member.user.tag}`
            })
        }, 200)       
    }
}
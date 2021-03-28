const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'removewarn',
    usage: 'removewarn <@member> [warnID]',
    alias: ['delwarn'],
    async execute(message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const id = args.slice(1).join(' ')

        if (!message.member.hasPermission('KICK_MEMBERS')){
            return message.reply('Nie masz permisji od użycia tej komendy!')
        }

        if(!target){
            return message.reply('Wskaż użytkownika, któremu chcesz usunąc ostrzeżenia!')
        }
        if(target.id === message.member.id){
            return message.reply('Nie możesz sobie usunąc ostrzeżeń!')
        }
        

        //embeds
        const embed1 = new Discord.MessageEmbed()
            .setDescription(`Usunięto wszystkie warny użytkownika \`${target.user.tag}\``)
            .setColor('BLUE')

        const embed2 = new Discord.MessageEmbed()
            .setDescription(`Usunięto warna z ID \`${id}\` z użytkownika \`${target.user.tag}\``)
            .setColor('BLUE')
        
        
        message.delete()
        if(!id){
            db.delete(`info.${target.id}.${message.guild.id}`)
            message.channel.send(embed1)
        }else{
            let database = db.fetch(`info.${target.id}.${message.guild.id}`)
            if (!database || database == []) return message.channel.send('Użytkownik nie ma żadnych warnów!')
    
            if (!database.find(data => data.id === id)) return message.channel.send("Nie znaleziono warna z podanym ID!")
    
            database.splice(database.findIndex(data => data.id == id), 1)

            if(database.length >= 1){
                db.set(`info.${target.id}.${message.guild.id}`, database)
            }else {
                db.delete(`info.${target.id}.${message.guild.id}`)
            }
            message.channel.send(embed2)
        }
    }
}
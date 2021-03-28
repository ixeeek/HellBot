const Discord = require('discord.js');
const db = require('quick.db');
let random_string = require('randomstring');

module.exports = {
    name: 'warn',
    usage: 'warn <@member/id>',
    async execute(message, args){
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');

        if(!target){
            return message.reply('Wskaż komu mam dodać ostrzeżenie!')
        }

        if(target.id === message.member.id){
            return message.reply('Nie możesz ostrzec samego/ej siebie!')
        }
        if (target.roles.highest.position >= message.member.roles.highest.position){
            return message.reply('Nie możesz dodać ostrzeżenia, dla kogoś z wyższą lub taką samą rolą!')
        }

        let warnID = await  
        random_string.generate({
          charset: 'numeric',
          length:10
        });

        db.push(`info.${target.id}.${message.guild.id}`,{moderator:message.author.tag , reason:reason ? reason : 'nie podano',id:warnID})
        db.add(`number.${target.id}.${message.guild.id}`,1)
        

        
        const usermessage = new Discord.MessageEmbed()
            .setTitle(':warning: Ostrzeżenie!')
            .setColor('BLUE')
            .addFields(
                {name: 'Powód', value:`${reason  || 'nie podano'}`},
                {name: 'Moderator', value:`${message.member.user.tag}`},
                {name: 'ID warna', value: `${warnID}`}
            )
        
        message.delete()
        target.send(usermessage).catch(() => {
            console.log('Blocked bot? Disabled dms?')
        });

        if(!reason){
            const embed = new Discord.MessageEmbed()
                .setDescription(`\`${message.member.user.tag}\` ostrzega \`${target.user.tag}\``)
                .setColor('BLUE')
                .setFooter(`ID warna: ${warnID}`)

            message.channel.send(embed)
        } else {
            const embed = new Discord.MessageEmbed()
                .setDescription(`\`${message.member.user.tag}\` ostrzega \`${target.user.tag}\` z powodem \`${reason}\``)
                .setColor('BLUE')
                .setFooter(`ID warna: ${warnID}`)

            message.channel.send(embed)
        }

        return 
    } 
}
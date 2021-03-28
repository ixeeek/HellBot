const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    usage: 'clear [ilośc]',
    execute(message, args){
        const amount = parseInt(args[0]);

        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('Nie masz permisji do użycia tej komendy!')
        }

        if(!amount){
            return message.reply(`Podaj prawidłową ilośc wiadomosci do usunięcia!\nPoprawne użycie komendy: \`${module.exports.usage}\``)
        }

        if(isNaN(amount)){
            return message.reply(`Podaj prawidłową ilośc wiadomosci do usunięcia!\nPoprawne użycie komendy: \`${module.exports.usage}\``)
        }

        if(amount > 100 || amount < 1){
            return message.reply('Podaj liczbe wiadomości w zakresie od 1 do 100')
        }

        if(amount === 100){
            message.channel.bulkDelete(amount, true)
            .then(delamount => {
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**:white_check_mark: Usunięto \`${delamount.size}\` wiadomości!**`)
                    .setColor('NAVY')
            
                message.channel.send(embed)
                    .then(msg => {
                        msg.delete({ timeout: 10000 }).catch(() => {return})
                    })
                return  
            }) 
        }else{
            message.channel.bulkDelete(amount + 1, true)
            .then(delamount => {
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**:white_check_mark: Usunięto \`${delamount.size - 1}\` wiadomości!**`)
                    .setColor('NAVY')

                message.channel.send(embed)
                    .then(msg => {
                        msg.delete({ timeout: 10000 }).catch(() => {return})
                    })
                return  
            })   
        }
    }
}
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
            .setTitle('Komendy hellbota')
            .setColor('GREEN')
            .setFooter('Hellbot jest naszym autorskim botem. Po informacje z nim, zapraszmy do ixeka - ixek#0001')
            .setDescription('Prefix bota to: `>`\n\nModracyjne komendy są dostepne pod >modhelp')
            .addFields(
                {name: 'avatar', value: 'Użycie: `avatar [@użytkownik]`\nPokazuje avatar użytkownika.'},
                {name: 'cat', value: 'Użycie: `cat`\nPokazuje zdjęcie kota.'},
                {name: 'dog', value: 'Użycie: `dog`\nPokazuje zdjęcie psa.'},
                {name: 'meme', value: 'Użycie: `meme`\nPokazuje śmiesznego mema.'},
                {name: 'serverinfo', value: 'Użycie: `serverinfo`\nPokazuje podstawowe informacje o serwerze'},
                {name: 'userinfo', value: 'Użycie: `userinfo [@użytkownik/id]`\nPokazuje podstawowe informacje o użytkowniku.'},
                {name: 'warnings', value: 'Użycie: `warnings [@użytkownik/id]`\nPokazuje ostrzeżenia użytkownika.'},
                {name: 'porn', value:'Użycie `porn <rodzaj>`\nKomenda +18, pokazuje obrazek/gifa NSFW zgodnie z podanym rodzajem.'}
            )
        
        message.channel.send(embed)
    }
}
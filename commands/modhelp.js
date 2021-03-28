const Discord = require('discord.js');

module.exports = {
    name: 'modhelp',
    execute(message, args){
        let role = message.guild.roles.cache.find(role => role.id === "759411686028476476");

        if(!message.member.roles.cache.has(role.id)){
            return message.reply('Nie możesz użyć tej komendy!')
        }

        const embed = new Discord.MessageEmbed()
            .setTitle('Moderacyjne komendy Hellbota')
            .setDescription('Prefix bota to: `>`')
            .setColor('DARK_GREEN')
            .addFields(
                {name: 'ban', value: 'Użycie: `ban <@użytkownik/id> [powód]`\nBanuje podanego użytkownika.'},
                {name: 'kick', value: 'Użycie: `kick <@użytkownik/id> [powód]`\nWyrzuca podanego użytkownika.'},
                {name: 'mute', value: 'Użycie: `mute <@użytkownik/id> <czas/perm> [powód]`\nMutuje podanego użytkownika na podany czas.'},
                {name: 'unmute', value: 'Użycie: `unmute <@użytkownik/id>`\nUsuwa wyciszenie z użytkownika.'},
                {name: 'warn', value: 'Użycie: `warn <@użytkownik/id> [powód]`\nOstrzega podanego użytkownika.'},
                {name: 'removewarn', value: 'Użycie: `revemowawarn <@użytkownik/id> [id warna]`\nUsuwa jedno lub wszystkie ostrzeżenia.'},
                {name: 'clear', value: 'Użycie: `clear <ilość>`\nUsuwa podaną ilośc wiadomości.'},
                {name: 'nuke', value: 'Użycie: `nuke`\nCzyści cały kanał.'},
                {name: 'voicemute', value: 'Użycie: `voicemute <@użytkownik/id> <czas/perm> [powód]`\nWycisza użytkownika na kanałach głosowych.'},
                {name: 'voiceunmute', value: 'Użycie: `voiceunmute <@użytkownik/id>`\nUsuwa wyciszenie z kanałów głosowych dla podanego użytkownika.'},
            )

        message.channel.send(embed)
            .then(msg => {
                setTimeout(() => {
                    msg.delete()
                }, 30000)
            })
    }
}
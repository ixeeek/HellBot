const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: 'roll',
    usage: 'roll <min> <max>',
    execute(message, args) {
        const min = args[0]
        const max = args[1]

        let min1 = Math.ceil(min);
        let max1 = Math.floor(max);

        const x = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;

        if (!min) {
            return message.reply(`Podaj minimalną wartość!\nPoprawne użycie komendy: \`${module.exports.usage}\``)
        }
        if (!max) {
            return message.reply(`Podaj maksymalną wartość!\nPoprawne użycie komendy: \`${module.exports.usage}\``)  
        }
        
        return message.reply(x)
    }
}
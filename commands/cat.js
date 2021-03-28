const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    name: 'cat',
    usage: 'cat',
    async execute(message, args) {
        const subReddits = ["cat"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random).catch(() => {return});


        setTimeout(() => {
            message.channel.send(img)    
        }, 500)
    }
}
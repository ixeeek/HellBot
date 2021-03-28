const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    name: 'dog',
    usage: 'dog',
    async execute(message, args) {
        const subReddits = ["DOG"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);


        setTimeout(() => {
            message.channel.send(img)    
        }, 500)
    }
}
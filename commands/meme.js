const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    name: 'meme',
    usage: 'meme',
    async execute(message, args) {
        const subReddits = ["dankmemes", "memes", "me_irl", "meme", "cursedcomments", "funny"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
            .setDescription(`Mem z \`/r/${random}\``)
            .setColor('RANDOM')
            .setImage(img)
        

        setTimeout(() => {
            message.channel.send(`${img}`)
            //message.channel.send(embed)    
        }, 500)
        
    }
}
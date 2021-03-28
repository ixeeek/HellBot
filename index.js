//moduly
const Discord = require('discord.js');
const moment = require('moment');
const fs = require('fs');
const ms = require('ms');
const cron = require('cron');

//client
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

//config
const config = require('./config.json');

//command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();

//events handling
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
    console.log(`${file} loaded`)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

// ---------


//akutalizacja kanału z datą
let zmianiadaty = new cron.CronJob('00 01 00 * * *', () => {
    const guild = client.guilds.cache.find(g => g.id === config.guildid);

    const datax = moment().format('DD/MM/YYYY')

    guild.channels.cache.get(config.dataid).edit({
        name: `🕒︱Data: ${datax}`
    })
})


//on ready
client.on('ready', () => {
    console.log(" _    _ ______ _      _      ____   ____ _______ \n| |  | |  ____| |    | |    |  _ \\ / __ \\__   __|\n| |__| | |__  | |    | |    | |_) | |  | | | |   \n|  __  |  __| | |    | |    |  _ <| |  | | | |   \n| |  | | |____| |____| |____| |_) | |__| | | |   \n|_|  |_|______|______|______|____/ \\____/  |_|   ")
    console.log(' ')
    console.log(`Logged in as ${client.user.tag} - ${client.user.id}`)
    console.log(' ')
    console.log(`Command logs:`)

    zmianiadaty.start()

    const guild = client.guilds.cache.find(g => g.id === config.guildid);

    const data = moment().format('DD/MM/YYYY')

    client.user.setActivity('https://hellup.pl', {type: 2})
    guild.channels.cache.get(config.dataid).edit({
        name: `🕒︱Data: ${data}`
    })
})

//pliki komend
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
    console.log(`${file} loaded`)
}


//on message
client.on('message', message => {
    if(message.channel.id === '761695458598453278'){
        if(message.attachments.size > 0){
            message.react('👍')
            message.react('👎')
            message.react('🤣')
        }else if(message.content.includes('https://')){
            message.react('👍')
            message.react('👎')
            message.react('🤣')
        }else if(message.content.includes('http://')){
            message.react('👍')
            message.react('👎')
            message.react('🤣')
        }
    }else if(message.channel.id === '779103913680699423'){
        if(message.attachments.size > 0){
            message.react('779116005284642857')
            message.react('779116034794979359')
        }else if(message.content.includes('https://')){
            message.react('779116005284642857')
            message.react('779116034794979359')
        }else if(message.content.includes('http://')){
            message.react('779116005284642857')
            message.react('779116034794979359')
        }
    }
    
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    console.log(message.content)
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
    	command.execute(message, args, client);
    } catch (error) {
    	console.error(error);
    	message.reply('BŁĄD! Skontaktuj się z administratorem!');
    }
})


//login
client.login(config.token)

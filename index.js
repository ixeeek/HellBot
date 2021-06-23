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
};

//command handling
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
    console.log(`${file} loaded`)
};

//login
client.login(config.token)

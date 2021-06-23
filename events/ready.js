const cron = require('cron');
const config = require('../config.json');
const moment = require('moment');

module.exports = {
    name: 'ready',
    execute(client) {
        let zmianiadaty = new cron.CronJob('00 01 00 * * *', () => {
            const guild = client.guilds.cache.find(g => g.id === config.guildid);
        
            const datax = moment().format('DD/MM/YYYY')
        
            guild.channels.cache.get(config.dataid).edit({
                name: `🕒︱Data: ${datax}`
            })
        })

        //


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
    }
}
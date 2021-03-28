const config = require('../config.json');

module.exports = {
    name: 'guildMemberRemove',
    execute(member){
        member.guild.channels.cache.get(config.membercountid).edit({
            name: `👥︱Użytkownicy: ${member.guild.memberCount}`
        })
    }
}
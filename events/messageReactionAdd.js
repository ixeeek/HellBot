const config = require('../config.json');
const id = require('../rolemenu.json');

module.exports = {
    name: 'messageReactionAdd',
    execute(reaction, user, client){
        const guild = client.guilds.cache.find(g => g.id === config.guildid);
        const target = guild.members.cache.get(user.id);
        if(user.bot) return;

        if(reaction.message.id === id.weryfikacja){
            if(reaction.emoji.name === "✅"){
                let verifiedrole = guild.roles.cache.find(role => role.id === "747201870518419596");

                reason = `WERYFIKACJA`;
                target.roles.add(verifiedrole.id, reason)
            }
        }else if(reaction.message.id === id.main){
            //roles
            let role1 = guild.roles.cache.find(role => role.id === "759421223930298418"); //anime fan
            let role2 = guild.roles.cache.find(role => role.id === "756650341050744832"); //tryhard
            let role3 = guild.roles.cache.find(role => role.id === "762431579234238475"); //gamer
            let role4 = guild.roles.cache.find(role => role.id === "773504637709713439"); //dj

            reason = 'REACTION ROLES';

            if(reaction.emoji.name === '1️⃣'){
                if(target.roles.cache.has(role1.id)){
                    target.roles.remove(role1.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Usunięto role: \`${role1.name}\``)
                }else{
                    target.roles.add(role1.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Dodano role: \`${role1.name}\``)
                }
            }else if(reaction.emoji.name === '2️⃣'){
                if(target.roles.cache.has(role2.id)){
                    target.roles.remove(role2.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Usunięto role: \`${role2.name}\``)
                }else{
                    target.roles.add(role2.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Dodano role: \`${role2.name}\``)
                }
            }else if(reaction.emoji.name === '3️⃣'){
                if(target.roles.cache.has(role3.id)){
                    target.roles.remove(role3.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Usunięto role: \`${role3.name}\``)
                }else{
                    target.roles.add(role3.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Dodano role: \`${role3.name}\``)
                }
            } else if(reaction.emoji.name === '4️⃣'){
                if(target.roles.cache.has(role4.id)){
                    target.roles.remove(role4.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Usunięto role: \`${role4.name}\``)
                }else{
                    target.roles.add(role4.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Dodano role: \`${role4.name}\``)
                }
            }
        }else if(reaction.message.id === id.nsfw){
            let role = guild.roles.cache.find(role => role.id === "786920137701195786");

            reason = 'NSFW REACTION ROLES'
            if(reaction.emoji.name === '🔞'){
                if(target.roles.cache.has(role.id)){
                    target.roles.remove(role.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Usunięto role: \`${role.name}\``)
                }else{
                    target.roles.add(role.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Dodano role: \`${role.name}\``)
                }
            }
        } else if (reaction.message.id === id.ogloszeniamc) {
            let role = guild.roles.cache.find(role => role.id === '832978918406619136')

            reason = 'Ogłoszenia MC reaction roles';
            if (reaction.emoji.name === '👁') {
                if(target.roles.cache.has(role.id)){
                    target.roles.remove(role.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Usunięto role: \`${role.name}\``)
                }else{
                    target.roles.add(role.id, reason)
                    reaction.users.remove(user.id);
                    target.send(`**hellup.pl** >> Dodano role: \`${role.name}\``)
                }
            }
        }
    }
}
module.exports = {
    name: 'say',
    async execute(message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;

        const wiadomosc = args.slice(0).join(' ');

        message.delete()
        message.channel.send(wiadomosc)
    }
}
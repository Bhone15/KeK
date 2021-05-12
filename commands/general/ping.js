const { PREFIX } = require('../../config.json');

module.exports = {
     name: 'ping',
     aliases: ['test'],
     cooldown: 0,
     permissions: [],
     description: 'Show the bot latency',
     example: "`${PREFIX}ping`",
     usage: "`${PREFIX}ping`",
     execute(message, args, cmd, client, Discord, profileData) {
          message.reply('Calculated ping <a:giphy:836945718039150652> ....').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;
            const embed = new Discord.MessageEmbed()
            .setTitle("Pong!:ping_pong: ....")
            .setColor('RANDOM')
            .setDescription(`Bot latency: ${ping}ms, API Latency: ${client.ws.ping}ms`)
            .setTimestamp()
            message.delete()
            resultMessage.edit(embed)
                   
            //resultMessage.edit(`Bot latency: ${ping}ms, API Latency: ${client.ws.ping}ms`)
        })
     }
}
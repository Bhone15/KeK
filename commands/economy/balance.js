const { PREFIX } = require('../../config.json')

module.exports = {
     name: 'balance',
     aliases: ['bal', 'bl'],
     cooldown: 8,
     permissions: [],
     description: 'Check the user balance',
     example: "`${PREFIX}bal`",
     usage: "`${PREFIX}bal`",
     execute(message, args, cmd, client, Discord, profileData) {
          const balEmbed = new Discord.MessageEmbed()
          .setColor(`RANDOM`)
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTitle(`${message.author.tag}'s Balance`)
          .setDescription(`Wallet: ${profileData.coins} \n Bank: ${profileData.bank}`)
          .setTimestamp();
          message.channel.send(balEmbed);
     }
}
const { PREFIX } = require('../../config.json');
module.exports = {
     name: 'suggestions',
     aliases: ['suggest', 'suggestion'],
     cooldown: 30,
     permissions: [],
     description: 'creates a suggestion!',
     example: "`${PREFIX}suggest <text>`",
     usage: "`${PREFIX}suggest`",
     execute(message, args, cmd, client, Discord) {
          const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
          if(!channel) return message.channel.send('Suggestions channel does not exist!');

          let messageArgs = args.join(' ');
          const embed = new Discord.MessageEmbed()
          .setColor(`RANDOM`)
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(messageArgs);

          channel.send(embed).then((msg) => {
               msg.react(':thumbsup:');
               msg.react(':thumbsdown:');
               message.delete();
          }).catch((err) => {
               throw err;
          });
     }
}
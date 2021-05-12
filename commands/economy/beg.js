const { PREFIX } = require('../../config.json');
const profileModel = require('../../models/profileSchema');
module.exports = {
     name: 'beg',
     aliases: [],
     cooldown: 8,
     permissions: [],
     description: 'Beg for coins',
     example: "`${PREFIX}beg`",
     usage: "`${PREFIX}beg`",
     async execute(message, args, cmd, client, Discord, profileData) {
         const randomNumber = Math.floor(Math.random() * 500) + 1;
         const response = await profileModel.findOneAndUpdate({
              userID: message.author.id,
         }, {
              $inc: {
                   coins: randomNumber,
              }
         });
         return message.channel.send(`${message.author.username}, you begged and received ${randomNumber} **coins**`);
     }
}
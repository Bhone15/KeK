const { PREFIX } = require('../../config.json');
const profileModel = require('../../models/profileSchema');

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
     const prefix = PREFIX;
     if (!message.content.startsWith(prefix) || message.author.bot) return;

     let profileData;
     try{
          profileData = await profileModel.findOne({ userID: message.author.id });
          if(!profileData) {
               let profile = await profileModel.create({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: 1000,
                    bank: 0
     });
     profile.save();
          }
     }catch(err){
          console.log(err);
     }

     const args = message.content.slice(prefix.length).split(/ +/);
     const cmd = args.shift().toLowerCase();

     const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

     // cooldown cmd
     if(!cooldowns.has(command.name)) {
          cooldowns.set(command.name, new Discord.Collection());
     }

     const current_time = Date.now();
     const time_stamps = cooldowns.get(command.name);
     const cooldown_amount = (command.cooldown) * 1000;

     if(time_stamps.has(message.author.id)){
          const exporation_time = time_stamps.get(message.author.id) + cooldown_amount;

          if (current_time < exporation_time) {
               const time_left = (exporation_time - current_time) / 1000;

               return message.reply(`Please wait ${time_left.toFixed(1)} more seconds befor using ${command.name}`);
          }
     }

     time_stamps.set(message.author.id, current_time);
     setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);


     // permission handler
     const validPermissions = [
          'CREATE_INSTANT_INVITE',
          'KICK_MEMBERS',
          'BAN_MEMBERS',
          'ADMINISTRATOR',
          'MANAGE_CHANNELS',
          'MANAGE_GUILD',
          'ADD_REACTIONS',
          'VIEW_ADUIT_LOG',
          'PRIORITY_SPEAKER',
          'STREAM',
          'VIEW_CHANNEL',
          'SEND_MESSAGES',
          'SEND_TTS_MESSAGES',
          'MANAGE_MESSAGES',
          'EMBED_LINKS',
          'ATTACH_FILES',
          'READ_MESSAGE_HISTORY',
          'MENTION_EVERYONE',
          'USE_EXTERNAL_EMOJIS',
          'VIEW_GUILD_INSIGHTS',
          'CONNECT',
          'SPEAK',
          'MUTE_MEMBERS',
          'DEAFEN_MEMBERS',
          'MOVE_MEMBERS',
          'USE_VAD',
          'CHANGE_NICKNAME',
          'MANAGE_NICKNAMES',
          'MANAGE_ROLES',
          'MANAGE_WEBHOOKS',
          'MANAGE_EMOJIS',
     ]

     if(command.permissions.length){
          let invalidPerms = []
          for(const perm of command.permissions){
               if(!validPermissions.includes(perm)) {
                    return console.log(`Invalid Permission ${perm}`);
               }
               if(!message.member.hasPermission(perm)){
                    invalidPerms.push(perm);
               }             
          }
          if (invalidPerms.length) {
               const invalidPerEmbed = new Discord.MessageEmbed()
               .setTitle(`**User Permission Error!**`)
               .setColor(`RED`)
               .setDescription(`**Sorry, you don't have permissions to use this! ❌** \n **Missing Permissions: \`${invalidPerms}\`**`)
               .setTimestamp();
               return message.channel.send(invalidPerEmbed);
          }
     }

     try {
          command.execute(message, args, cmd, client, Discord, profileData);
     } catch (err) {
          message.reply ("There was an error trying to execute this command!")
          console.log(err);
     }
}
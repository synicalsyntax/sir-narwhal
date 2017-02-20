const Discord = require('discord.js');
let cooldown = [];
let cooldownIndex;

module.exports = exports = function (msg) {
  msg.delete().catch(console.error); // delete any message sent to channel #region-grouping

  const member = msg.member; // author of message
  const role = msg.content.toUpperCase(); // capitalizes message content
  const regions = ['NA', 'EUW', 'JP', 'LAN', 'EUNE', 'KR', 'LAS', 'RU', 'OCE', 'BR', 'TR']; // create array of all regions
  const lol = msg.guild.channels.find('name', 'league-of-legends'); // bot response channel, set to channel #league-of-legends
  const roles = msg.guild.roles;
  const region = msg.guild.roles.find('name', role);

  if (!regions.includes(role) || !region || member.roles.exists('name', role)) { // if role isn't a valid region
    return;
  }

  const memberCount = region.members.array().length + 1; // set memberCount to amount of users with the new region role
  let roleAction = ' joined region '; // default role action is join region

  const old = regions.find(current => member.roles.exists('name', current)); // find the previous region role

  if (old) { // if member had a previous region role (not null)
    roleAction = ' switched to region '; // set role action to switch
    if (cooldown.findIndex(sender => sender.user === msg.author) > -1) {
      msg.author.sendMessage('Sorry ' + msg.author + ', you\'re switching regions too fast! Please wait **' + cooldown[cooldown.findIndex(sender => sender.user === msg.author)].time.toString().slice(0, -3) + ' seconds**.');
      return;
    }
    member.removeRole(roles.find('name', old)).catch(console.error); // remove old region role
  }

  const embed = new Discord.RichEmbed() // embed message formatting
    .setAuthor('Region Grouping', msg.guild.iconURL) // set author field to Region Grouping with guild's icon
    .setColor(region.color) // set embed color to new region role color
    .setDescription(msg.author + roleAction + role + '!') // add field with '[user] joined region [region]'
    .addField('Region ' + role + ' now has ' + memberCount + ' members', 'Join a region at <#272250356602503168>!') // add fields for region member count and 'join [region]' message
    .setFooter('Sir Narwhal is a bot written by @synicalsyntax', msg.guild.members.get('274958738354601984').user.avatarURL) // add footer field for bot credits (me)
    .setThumbnail(msg.author.avatarURL) // set thumbnail to author's avatar
    .setTimestamp(); // adds timestamp

  member.addRole(region).catch(console.error).then(() => { // add region role to user
    lol.sendEmbed(embed); // send embed
    cooldown.push({
      user: msg.author,
      time: 60000
    });
    cooldownIndex = cooldown.findIndex(sender => sender.user === msg.author);
    let countdown = setInterval(() => {
      cooldownIndex = cooldown.findIndex(sender => sender.user === msg.author);
      if (cooldownIndex > -1 && cooldown[cooldownIndex].time > 0) {
        cooldown[cooldownIndex].time -= 1000;
      }
    }, 1000);
    setTimeout(() => {
      cooldown.splice(cooldownIndex - 1, 1);
      clearInterval(countdown);
    }, 60000);
  });
};

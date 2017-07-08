const cooldown = new Map();

exports.run = (client, msg) => {
  msg.delete();

  const role = msg.content.toUpperCase();
  const regions = ['NA', 'EUW', 'JP', 'LAN', 'EUNE', 'KR', 'LAS', 'RU', 'OCE', 'BR', 'TR'];
  const lol = client.channels.get(client.config.regionResponseChannelID);
  const region = msg.guild.roles.find('name', role);

  if (!regions.includes(role) || !region || msg.member.roles.exists('name', role)) {
    return;
  }

  const memberCount = msg.guild.roles.find('name', role).members.size + 1;

  const old = regions.find(current => msg.member.roles.exists('name', current));

  if (cooldown.has(msg.author.id)) {
    const time = Math.round((cooldown.get(msg.author.id) - Date.now()) / 1000);
    const warn = `Sorry ${msg.author}, you're switching regions too fast! Please wait **${time} second${time === 1 ? '' : 's'}**.`;
    return msg.author.send(warn);
  } else if (old) {
    msg.member.removeRole(msg.guild.roles.find('name', old));
  }

  const embed = {
    color: region.color,
    author: {
      name: 'Region Grouping',
      icon_url: msg.guild.iconURL
    },
    description: `${msg.author} ${old ? 'switched to region' : 'joined region'} ${role}!`,
    fields: [
      {
        name: `Region ${role} now has ${memberCount} members`,
        value: `Join a region at <#${client.config.regionGroupingChannelID}>!`
      }
    ],
    thumbnail: {
      url: msg.author.displayAvatarURL
    },
    timestamp: new Date(),
    footer: {
      icon_url: client.users.get('274958738354601984').displayAvatarURL,
      text: 'Sir Narwhal is a bot written by @synicalsyntax'
    }
  };

  msg.member.addRole(region).then(() => {
    lol.send({ embed });
    cooldown.set(msg.author.id, Date.now() + (client.config.regionJoinCooldown * 60000));
    setTimeout(() => {
      cooldown.delete(msg.author.id);
    }, client.config.regionJoinCooldown * 60000);
  });
};

exports.channel = require('../../config.json').regionGroupingChannelID;

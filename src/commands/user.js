exports.run = (client, msg) => {
  if (msg.author.equals(client.user) || !msg.content.startsWith(client.config.userPrefix)) {
    return;
  }

  const command = msg.content.split(' ')[0].slice(client.config.userPrefix.length);

  if (command === 'current') {
    const embed = {
      color: msg.member.displayColor,
      title: 'Current Count',
      description: `The current count number is **${client.count - 1}**!`,
      timestamp: new Date(),
      footer: {
        icon_url: msg.guild.iconURL,
        text: `Requested by ${msg.author.username}`
      }
    };
    msg.channel.send({ embed });
  }
};

exports.channel = require('../../config.json').userChannelID;

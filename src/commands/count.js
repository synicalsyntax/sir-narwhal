exports.run = (client, msg) => {
  if (msg.author.equals(client.user)) {
    return;
  }

  if (msg.content % 1 !== 0 || parseInt(msg.content, 10) !== client.count || parseInt(msg.content, 10).toString() !== msg.content) {
    return msg.delete();
  }

  if (client.count % 100 === 0) {
    const embed = {
      color: msg.member.displayColor,
      title: `${client.count} milestone achieved!`,
      description: `${msg.author} brought the count up to ${client.count}! 🎉`,
      timestamp: new Date(),
      footer: {
        icon_url: msg.guild.iconURL,
        text: client.config.teemoQuotes[Math.floor(Math.random() * client.config.teemoQuotes.length)]
      }
    };
    msg.channel.send({ embed });
  }

  client.count += 1;
};

exports.channel = require('../../config.json').countChannelID;

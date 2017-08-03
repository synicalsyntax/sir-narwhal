exports.run = (client, reaction, user) => {
  reaction.remove(user);

  if (reaction.emoji.name !== '✅') {
    return;
  }

  const embed = {
    title: 'Transferring...',
    color: 5987163
  };

  reaction.message.channel.send({ embed }).then(m => m.delete(500));

  const guild = reaction.message.guild;

  if (client.config.defaultRole) {
    guild.member(user).addRole(guild.roles.find('name', client.config.defaultRole));
  }

  const welcome = {
    color: 0x59cb38,
    title: `:wave: Welcome to ${guild.name}!`,
    thumbnail: {
      url: user.displayAvatarURL
    },
    fields: [{
      name: 'Username',
      value: user.username,
      inline: true
    },
    {
      name: 'ID',
      value: user.id,
      inline: true
    }],
    timestamp: new Date(),
    footer: {
      text: client.config.teemoQuotes[Math.floor(Math.random() * client.config.teemoQuotes.length)]
    }
  };

  if (client.config.welcomeChannelID) {
    guild.channels.get(client.config.welcomeChannelID).send({ embed: welcome });
  }
};

exports.channel = require('../../config.json').joinMessageID;

const teemoQuotes = [
  'Hut, two, three, four!',
  'Never underestimate the power of the Scouts Code.',
  'Captain Teemo on duty!',
  'Size doesn\'t mean anything.',
  'Reporting in.',
  'I\'ll scout ahead!',
  'That\'s gotta sting!',
  'Swiftly!',
  'Armed and ready!'
];

exports.run = (client, reaction, user) => {
  reaction.remove(user);
  if (reaction.emoji.name === '✅') {
    const embed = {
      title: 'Transferring...',
      color: 5987163
    };
    reaction.message.channel.send({ embed }).then(m => m.delete(500));
    const guild = reaction.message.guild;
    guild.member(user).addRole(guild.roles.find('name', client.config.defaultRole));
    const welcome = {
      color: 0x59cb38,
      title: ':wave: Welcome to the League of Teemos!',
      thumbnail: {
        url: user.displayAvatarURL
      },
      fields: [
        {
          name: 'Username',
          value: user.username,
          inline: true
        },
        {
          name: 'ID',
          value: user.id,
          inline: true
        }
      ],
      timestamp: new Date(),
      footer: {
        text: teemoQuotes[Math.floor(Math.random() * teemoQuotes.length)]
      }
    };
    guild.channels.get(client.config.welcomeChannelID).send({ embed: welcome });
  }
};

exports.channel = require('../../config.json').joinMessageID;

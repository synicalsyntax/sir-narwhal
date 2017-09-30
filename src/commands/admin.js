exports.run = (client, msg) => {
  if (msg.author.equals(client.user) || !msg.content.startsWith(client.config.userPrefix)) {
    return;
  }

  const command = msg.content.split(' ')[0].slice(client.config.userPrefix.length);
  const args = msg.content.split(' ').slice(1).join(' ');

  if (command === 'set') {
    if (args % 1 === 0) {
      client.count = parseInt(args, 10) + 1;
      msg.react('✅');
    } else {
      msg.react('❌');
    }
  }
};

exports.channel = require('../../config.json').adminChannelID;

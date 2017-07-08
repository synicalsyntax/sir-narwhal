const express = require('express');
const app = express();
const port = process.env.PORT || 9880;
const http = require('http');

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.config = require('../config.json');
client.commands = new Discord.Collection();

app.set('view engine', 'ejs');
app.use(express.static('./src/static'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Website is running on http://localhost:${port}`);
});

client.once('ready', () => {
  console.log('I\'m ready to run! :)');
  client.user.setGame('sir-narwhal.herokuapp.com');
  client.channels.get(client.config.joinChannelID).fetchMessages();
  setInterval(() => {
    http.get('http://sir-narwhal.herokuapp.com');
  }, 1800000);
});

fs.readdir('./src/commands', (err, files) => {
  if (err) {
    return console.error(err);
  }
  for (const file of files) {
    const data = require(`./commands/${file}`);
    client.commands.set(data.channel, data);
  }
  console.log(`Loaded ${client.commands.size} commands!`);
});

client.on('disconnect', () => {
  console.log('I\'ve disconnected! Oh no! D:');
});

client.on('message', msg => {
  if (client.commands.get(msg.channel.id)) {
    client.commands.get(msg.channel.id).run(client, msg);
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  if (client.commands.get(reaction.message.id)) {
    client.commands.get(reaction.message.id).run(client, reaction, user);
  }
});

client.login(client.config.token);

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection at:', err);
});

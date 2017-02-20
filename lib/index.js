'use strict'; // catch errors easier

// Requirements
const regionGrouping = require('../lib/region-grouping.js');
const cfg = require('../config.js');
const path = require('path');
const Discord = require('discord.js');
const http = require('http');
const express = require('express');
const bot = new Discord.Client();
const app = express();
const port = process.env.PORT || 8080; // sets server port

// Server
app.set('view engine', 'ejs'); // sets view engine to ejs

app.use(express.static(path.join(__dirname, '/static'))); // serves static items in lib/static folder

app.get('/', function (req, res) {
  res.render('index'); // renders views/index.ejs
});

app.listen(port, function () {
  console.log('Website is running on http://localhost:' + port); // prints message in console log when website is running
});

// Discord.js bot client
bot.on('ready', () => {
  console.log('I\'m ready to run! :)'); // prints message in console log when bot is ready
  setInterval(function () {
    http.get('http://sir-narwhal.herokuapp.com');
  }, 1800000); // pings server every 30 minutes to prevent dyno from sleeping
});

bot.on('error', e => {
  console.error(e); // prints message in console log when bot errors
});

bot.on('disconnect', () => {
  console.log('I\'ve disconnected! Oh no! D:'); // prints message in console log when bot is disconnected
});

bot.on('message', msg => { // when a message is sent
  if (msg.channel.name === 'region-grouping') {
    regionGrouping(msg); // call regionGrouping function if message's channel is region-grouping
  }
});

bot.login(cfg.token).then(() => {
  console.log('I\'ve logged in! :D'); // prints message in console log when bot is logged in
  bot.user.setGame('sir-narwhal.herokuapp.com'); // sets "Playing [game]" status to "Playing sir-narwhal.herokuapp.com"
});

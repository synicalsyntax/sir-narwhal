'use strict'; // catch errors easier

// Requirements
const cfg = require('../config.js');
const path = require('path');
const Discord = require('discord.js');
const http = require('http');
const express = require('express');
const bot = new Discord.Client();
const app = express();

var port = process.env.PORT || 8080; // sets server port

app.set('view engine', 'ejs'); // sets view engine to ejs

app.use(express.static(path.join(__dirname, '/static'))); // serves static items in lib/static folder

app.get('/', function (req, res) {
  res.render('index'); // renders views/index.ejs
});

app.listen(port, function () {
  console.log('Website is running on http://localhost:' + port); // prints message in console log when website is running
});

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
  let member = msg.member; // author of message
  let role = msg.content.toUpperCase(); // capitalizes message content
  let regions = ['NA', 'EUW', 'JP', 'LAN', 'EUNE', 'KR', 'LAS', 'RU', 'OCE', 'BR', 'TR']; // create array of all supported regions
  let lol = msg.guild.channels.find('name', 'league-of-legends'); // bot response channel, set to channel #league-of-legends
  if (msg.channel.name !== 'region-grouping') { // if message not sent to region-grouping, break
    return;
  }
  msg.delete().catch(console.error); // delete any message sent to channel #region-grouping
  if (regions.indexOf(role) < 0) { // if role belongs to an item in list regions, break
    return;
  }
  let region = msg.guild.roles.find('name', role); // set region to the guild role
  let memberCount = region.members.array().length + 1; // set memberCount to amount of users with the new region role
  if (msg.member.roles.has(region.id)) { // if member already has role that was entered, break
    return;
  }
  let check = true; // check will be used to check if a user already has a region role
  let old; // old will be set to a duplicated region if found
  for (var step = 0; step < regions.length; step++) { // for each item in list regions
    if (msg.member.roles.has(msg.guild.roles.find('name', regions[step]).id)) { // if a member has a role with the iterated region role
      old = msg.guild.roles.find('name', regions[step]); // set old to duplicated region
      check = false; // set check to false
    }
  }
  let roleAction; // user region role action depends on whether they had previous region role or not
  if (check) { // if check is true (if a member has not had a previous region role)
    roleAction = ' joined region '; // sets roleAction to 'join'
  } else { // if check is not true (false) (if a member has a previous region role)
    roleAction = ' switched to region '; // sets roleAction to 'switch'
    member.removeRole(old).catch(console.error); // add user's previous region role
  }
  let embed = new Discord.RichEmbed() // embed message formatting
    .setAuthor('Region Grouping', msg.guild.iconURL) // set author field to Region Grouping with guild's icon
    .setColor(region.color) // set embed color to new region role color
    .setDescription(msg.author + roleAction + role + '!') // add field with '[user] joined region [region]'
    .addField('Region ' + role + ' now has ' + memberCount + ' members', 'Join a region at <#272250356602503168>!') // add fields for region member count and 'join [region]' message
    .setFooter('Sir Narwhal is a bot written by @synicalsyntax', msg.guild.members.get('274958738354601984').user.avatarURL) // add footer field for bot credits (me)
    .setThumbnail(msg.author.avatarURL) // set thumbnail to author's avatar
    .setTimestamp(); // adds timestamp
  member.addRole(region).catch(console.error).then(() => { // add region role to user
    lol.sendEmbed(embed); // send embed
  });
});

bot.login(cfg.token).then(() => {
  console.log('I\'ve logged in! :D'); // prints message in console log when bot is logged in
  bot.user.setGame('sir-narwhal.herokuapp.com'); // sets "Playing [game]" status to "Playing sir-narwhal.herokuapp.com"
});

/*
Miscellaneous

These are some of the earlier developed bot commands developed but removed from production as requested by the client.
They will be kept here in case they are requested in the future.

let prefix = '/region';
let role = msg.content.split(/ /)[2];
let command = msg.content.split(/ /)[1];
let commands = ['add', 'switch', 'remove'];

if (msg.member.roles.has(region.id)) {
    msg.channel.sendMessage('**ERROR:** Sorry ' + member + ', you\'re already part of region **' + role.toUpperCase() + '**!').catch(console.error);;
    return;
}

if (msg.content.startsWith(prefix)) {
    if (msg.content.split(/ /).length < 2) {
        msg.channel.sendMessage('**ERROR:** Sorry ' + member + ', you didn\'t specify a command!');
        return;
    } else if (commands.indexOf(command) >= 0) {
        if (role == null) {
            msg.channel.sendMessage('**ERROR:** Sorry ' + member + ', you didn\'t specify a region!');
            return;
        } else if (regions.indexOf(role) >= 0) {
            let region = msg.guild.roles.find('name', role);
            if (msg.member.roles.has(region.id)) {
                msg.channel.sendMessage('**ERROR:** ' + member + ', you\'re already part of region ' + region + '!');
                return;
            } else {
                member.addRole(region).catch(console.error);
                msg.channel.sendMessage('**Congrats!** ' + member + ' was added to ' + region + '!');
                return;
            }
        } else {
            msg.channel.sendMessage('**ERROR:** Sorry ' + member + ', region *' + role + '* was not found!');
            return;
        }
    } else {
        msg.channel.sendMessage('**ERROR:** Sorry ' + member + ', command `' + command + '` was not found!');
        return;
    }
}

lol.sendMessage(member + ' joined region **' + role + '**!').catch(console.error); // send '[user] joined region [region]' message to channel #league-of-legends
*/

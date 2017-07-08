# Sir Narwhal
<div align="center">
  <p>
    <a href="https://sir-narwhal.herokuapp.com">
      <img src="https://sir-narwhal.herokuapp.com/images/banner.png" width="546" alt="Sir Narwhal">
    </a>
    <br>
    Region role assigner bot for League of Teemos server on Discord
  </p>
  <p>
    <a href="http://discord.gg/YY8Senp">
      <img src="https://discordapp.com/api/guilds/264282097164746752/embed.png" alt="Discord server">
    </a>
    <a href="https://travis-ci.org/synicalsyntax/sir-narwhal">
      <img src="https://travis-ci.org/synicalsyntax/sir-narwhal.svg?branch=master" alt="Build status">
    </a>
    <a href="https://david-dm.org/synicalsyntax/sir-narwhal">
      <img src="https://david-dm.org/synicalsyntax/sir-narwhal.svg?theme=shields.io" alt="Dependency status">
    </a>
    <a href="https://codeclimate.com/github/synicalsyntax/sir-narwhal">
      <img src="https://codeclimate.com/github/synicalsyntax/sir-narwhal/badges/gpa.svg" alt="Code Climate">
    </a>
    <a href="http://github.com/synicalsyntax/sir-narwhal/releases/latest/">
      <img src="https://img.shields.io/github/release/synicalsyntax/sir-narwhal.svg" alt="GitHub latest release">
    </a>
    <a href="https://raw.githubusercontent.com/synicalsyntax/sir-narwhal/master/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license">
    </a>
</div>

## About

**Sir Narwhal** is a "region" role assigner bot commissioned for the [League of
Teemos server](http://discord.gg/YY8Senp) on [Discord](https://discordapp.com).

The purpose of this specialized bot is to give users specific roles after they
send a message corresponding to a valid region in a specified channel.Upon
success of the role addition, the a notification concerning the user's region
change will be sent to a different specified channel. The bot also checks that
all users have one region role at a time and replaces their region roles if they
request a new one and deletes any messages sent to the region assignment channel
for orderliness.

The bot also initiates new members to the server after they acknowledge the
server rules by assigning them a role that gives them access to all other
channels in the guild. It also welcomes new members by sending custom messages
to a specified channel.

---

The bot's source code, written with the
[Discord.js](https://github.com/hydrabolt/discord.js) library, is
located in `src`. The website is served from `src/index.js` using
[Express](https://github.com/expressjs/express), and a majority of the bot's
functions are located in `src/commands`.

The website's source code is located in `views/index.ejs`; however, its
static files (CSS stylesheets, images, fonts) are located in the
`src/static` folder.

## Installation

1. Open your command line interface (CLI).

2. Clone this repository:
    ```sh
    $ git clone https://github.com/synicalsyntax/sir-narwhal
    ```

3. Switch to the local copy of this repository:
    ```sh
    $ cd ~/path-to-repo/sir-narwhal
    ```

4. Install the dependencies in the local node_modules folder:
    ```sh
    $ npm install
    ```

5. If necessary, create a Discord bot account for your copy of the bot by
following this
[guide](https://twentysix26.github.io/Red-Docs/red_guide_bot_accounts/).


This bot can be modified by configuring the available options in `config.json`.



### Configuration

9. Create a file named `config.json` in the root of the folder with your local
copy of this repository with the following format:
    ```.js
    module.exports = {
       token: 'bot_token'
    };
    ```
    Replace `bot_token` with the token you copied from the Discord bot
    application page.

10. Change the values of the `regions` array in `src/region-grouping.js` to
valid role names (case-sensitive within single quotes) on your server.
    ```.js
    // Example
    const regions = ['Role1', 'Role2', 'Role3']; // create array of all regions
    ```

## Usage

To run this bot, ensure that you are in the folder with your local copy of
this repository and run:
```sh
$ npm run bot
```

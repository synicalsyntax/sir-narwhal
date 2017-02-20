# Sir Narwhal
<div align="center">
  <p>
  <a href="https://sir-narwhal.herokuapp.com"><img src="https://sir-narwhal.herokuapp.com/images/banner.png" width="546" alt="Sir Narwhal"></a>
  <br>
  Region role assigner bot for League of Teemos server on Discord
  </p>
  <p>
    <a href="http://discord.gg/YY8Senp"><img src="https://discordapp.com/api/guilds/264282097164746752/embed.png" alt="Discord server" /></a>
    <a href="https://travis-ci.org/synicalsyntax/sir-narwhal"><img src="https://travis-ci.org/synicalsyntax/sir-narwhal.svg?branch=master" alt="Build status" /></a>
    <a href="https://david-dm.org/synicalsyntax/sir-narwhal"><img src="https://david-dm.org/synicalsyntax/sir-narwhal.svg?theme=shields.io" alt="Dependency status" /></a>
    <!--<a href="https://coveralls.io/r/synicalsyntax/sir-narwhal"><img src="https://coveralls.io/repos/synicalsyntax/sir-narwhal/badge.svg" alt="Coverage percentage"></a>-->
    <a href="https://codeclimate.com/github/synicalsyntax/sir-narwhal"><img src="https://codeclimate.com/github/synicalsyntax/sir-narwhal/badges/gpa.svg" alt="Code Climate" /></a>
    <a href="http://github.com/synicalsyntax/sir-narwhal/releases/latest/"><img src="https://img.shields.io/github/release/synicalsyntax/sir-narwhal.svg" alt="GitHub latest release" /></a>
    <a href="https://raw.githubusercontent.com/synicalsyntax/sir-narwhal/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
</div>

## About

**Sir Narwhal** is a "region" role assigner bot commissioned by
**@Mr.Wail#4861** for the [League of Teemos server](http://discord.gg/YY8Senp)
on [Discord](https://discordapp.com).

The purpose of this highly-specialized bot is to give users specific
"region" roles after they send a message corresponding to a region in the
**#region-grouping** channel. Upon success of the role addition, the user
will be mentioned in a message in the **#league-of-legends** channel. The
bot also checks that all users have one "region" role at a time and replaces
their region roles if they request a new one. The bot also deletes any
messages sent to the **#region-grouping** channel for orderliness.

---

The bot's source code, written with the
[Discord.js](https://github.com/hydrabolt/discord.js) Node.js module, is
located in `lib/index.js`. The website is also served from `lib/index.js`
using [Express](https://github.com/expressjs/express).

The website's source code is located in `views/index.ejs`; however, its
static files (CSS stylesheets, images, fonts) are located in the
`lib/static` folder.

## Installation

### Local Installation

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

### Creating a Bot Account
5. Go to the [Discord application](https://discordapp.com/developers/applications/me)
and click the **New App** button.

6. Name your application as **Sir Narwhal** and add a picture and
description if you wish.

7. Click the **Create Bot User** button and accept the confirmation dialog
that appears.

8. Copy the token under the **App Bot User** section.

More detailed information on creating a Discord bot account can be found
[here](https://twentysix26.github.io/Red-Docs/red_guide_bot_accounts/).

### Configuration

9. Create a file named `config.js` in the root of the folder with your local
copy of this repository with the following format:
    ```.js
    module.exports = {
       token: 'bot_token'
    };
    ```
    Replace `bot_token` with the token you copied from the Discord bot
    application page.

10. Change the values of the `regions` array in `lib/region-grouping.js` to
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

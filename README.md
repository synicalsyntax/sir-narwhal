# Sir Narwhal

<div align="center">
  <p>
    <a href="https://sir-narwhal.herokuapp.com" style="text-decoration:none">
      <img src="https://sir-narwhal.herokuapp.com/images/banner.png" width="546" alt="Sir Narwhal">
    </a>
    <br>
    Region role assigner bot for League of Teemos server on Discord
  </p>

  [![Discord server](https://discordapp.com/api/guilds/264282097164746752/embed.png)](http://discord.gg/YY8Senp)
  [![Travis build status](https://img.shields.io/travis/synicalsyntax/sir-narwhal.svg)](https://travis-ci.org/synicalsyntax/sir-narwhal)
  [![Dependencies status](https://david-dm.org/synicalsyntax/sir-narwhal/status.svg)](https://david-dm.org/synicalsyntax/sir-narwhal)
  [![Code Climate](https://img.shields.io/codeclimate/github/synicalsyntax/sir-narwhal.svg)](https://codeclimate.com/github/synicalsyntax/sir-narwhal)
  [![GitHub latest release](https://img.shields.io/github/release/synicalsyntax/sir-narwhal.svg)](http://github.com/synicalsyntax/sir-narwhal/releases/latest/)
  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/synicalsyntax/sir-narwhal/master/LICENSE)
</div>

## About

**Sir Narwhal** is a channel-based, multipurpose bot commissioned for the
[League of Teemos server](http://discord.gg/YY8Senp) on
[Discord](https://discordapp.com).

The bot has various functions, including giving unique "region" roles to users
upon request, welcoming new members to the server, and automating an interactive
"count" game.

---

The bot's source code, written in [Node.js](https://nodejs.org/en/about/) with
the [Discord.js](https://github.com/hydrabolt/discord.js) library, is located in
`src`. The website is served from `./src/index.js` using
[Express](https://github.com/expressjs/express), and a majority of the bot's
functions are located in `./src/commands`.

The website's source code is located in `./views/index.ejs`; however, its
static files (CSS stylesheets, images, fonts) are located in the
`./src/static` folder.

## Installation

### Prerequisites

Before you get started, make sure you have:
   * [installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
   and
   [configured](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
   Git on your local machine
   * [installed](https://docs.npmjs.com/getting-started/installing-node)
   Node.js (version >= v6.0.0) and npm (version >= v3.8.6)
   * [created](https://twentysix26.github.io/Red-Docs/red_guide_bot_accounts/#creating-a-new-bot-account)
   a new Discord bot account for your bot
   * [invited](https://twentysix26.github.io/Red-Docs/red_guide_bot_accounts/#adding-the-bot-account-to-your-server)
   your bot account to your server

### Instructions

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

5. If necessary, create a Discord bot account for your local copy of the bot by
following this
[guide](https://twentysix26.github.io/Red-Docs/red_guide_bot_accounts/), and
invite it to your server.

6. Modify the available options in the example `config.json` to valid values.

### Configuration

You can modify the following values in `config.json` to customize the behavior
of Sir Narwhal:

* `token` **(REQUIRED)**: Your Discord bot account's token. Under no
circumstances should you reveal the value of this field to others, lest the
likely compromise of your bot.

* `regionGroupingChannelID`: The ID of the text channel that Sir Narwhal will
check prompts to join region roles for. If null, the region assignment
functionality will be disabled.

    * `regionResponseChannelID`: The ID of the text channel that Sir Narwhal
    will announce region assignments to. **Required** if
    `regionGroupingChannelID` is not null.

    * `regionJoinCooldown`: Number of minutes that a user must wait before
    switching to a different region. **Required** if `regionGroupingChannelID`
    is not null.

    * `regions`: Array of strings of role names that represent the regions
    users can join. Bot must have the right permissions and position in the role
    hierarchy in order for proper functionality. **Required** if
    `regionGroupingChannelID` is not null.

* `joinMessageID`: The ID of the message that Sir Narwhal checks for green
checkmark (✅) reactions. If null, the new member initiation functionality will
be disabled.

* `joinChannelID`: The channel ID of the message that Sir Narwhal checks for
green checkmark (✅) reactions. If null, the new member initiation functionality
will be disabled.

    * `defaultRole`: The role name that new members gain when they complete
    initiation. If null, no role will be assigned.

    * `welcomeChannelID`: The channel ID that Sir Narwhal will send a welcome
    message to when a new member is initiated. If null, no welcome message will
    be sent.

        * `teemoQuotes`: Array of strings that will be randomly included in
        welcome quotes. **Required** if `welcomeChannelID` is not null.

* `countChannelID`: The ID of the text channel that Sir Narwhal will
check responses to the count game for. If null, the count game functionality
will be disabled.

* `adminChannelID`: The ID of the text channel that Sir Narwhal will
check for administrator-only commands for. *This channel should only be
accessible to administrators.*

* `userChannelID`: The ID of the text channel that Sir Narwhal will
check for regular user commands for. *This channel should only be
accessible to users.*

* `userPrefix`: The prefix used for any administrator or user-prompted commands.
**Required** if either `adminChannelID` or `userChannelID` is not null.

## Usage

Once you have successfully installed and configured your copy of Sir Narwhal,
ensure that you are in the folder with your local copy of this repository and
run:

```sh
$ npm start
```

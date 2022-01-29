require('dotenv').config();
const Discord = require('discord.js');
const { Util } = require('discord.js')
const bot = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});
const fs = require('fs')
const { sendToChannel } = require('./send.js')
const {isAdmin, rmAdmin, addAdmin } = require('./database');
const { log } = require('console');

// - -- --- < ---- > --- -- -
bot.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  bot.commands.set(command.name, command)
}
const TOKEN = process.env.TOKEN;
const ADMIN_CHAT_ID = (process.env.ADMIN_CHAT_ID.length > 0) ? process.env.ADMIN_CHAT_ID : null
const MAIN_ADMIN_ID = (process.env.MAIN_ADMIN_ID.length > 0) ? process.env.MAIN_ADMIN_ID : null
// console.log(MAIN_ADMIN_ID);
let prefix = (process.env.PREFIX.length > 0) ? process.env.PREFIX : "$"

// - -- --- < ---- > --- -- -

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity(`${prefix}help`, {
    type: "LISTENING"
  })

});
// - -- --- < ---- > --- -- -

bot.on('messageCreate', async msg => {
  let { guild } = msg;
  const msg_author = msg.author.id

// - -- --- < ---- > --- -- -

  if (!msg.content.startsWith(prefix) || msg.author.bot) return
  const is_auth = await isAdmin(Number(msg_author))
  const is_admin = (msg_author === MAIN_ADMIN_ID) || is_auth ? true : false
  const is_main = (msg_author === MAIN_ADMIN_ID)

  // < - -- --- Exit Cons --- -- - >
  if (MAIN_ADMIN_ID == null) {
    msg.reply("[❗] This bot doesn't work without an owner and a main text channel!")
  }
    // - -- --- < Change Prefix > --- -- -
  if (msg.content.startsWith(`${prefix}prefix`)) {
    if (!is_main) {
      if (is_admin) {
        msg.reply("[!] You are not authorized as Main, this incident will be reported.")
        await bot.users.fetch(MAIN_ADMIN_ID)
        .then((owner) => {
          owner.send(`Admin <@${msg.author.id}> with id= \`${msg.author.id}\` in server=\`${guild.name}\` Tried to add Admin. `)
        })
        .catch((err) => {
          bot.channels.cache.get(ADMIN_CHAT_ID).send(err.message)
        })
      } else
        msg.reply("[!] You are not authorized as Owner")
      return
    }
    prefix = msg.content.split(`${prefix}prefix `)[1]
    bot.user.setActivity(`${prefix}help`, {
      type: "LISTENING"
    })
    msg.reply(`[🍑] Prefix is now set to ${prefix}`)
  }

  //           - -- --- < ---- > --- -- -
  // - -- --- < Send message to different channels > --- -- -

  if (msg.content.startsWith(`${prefix}send`)) {
    if (!is_admin) {
      msg.reply("[!] You are not authorized as Admin")
      return
    }
    const data = msg.content.split('-\n')
    const title = data[1]
    let content, image
    if (data[2].startsWith("http")) {
      content = data[3].replace(/<#(.*?)>/g, '')
      image   = data[2]
    } else {
      content = data[2].replace(/<#(.*?)>/g, '')
      image = false
    }

    let mentioned_chats = msg.mentions.channels

    channelIDs = []
    mentioned_chats.forEach(mention => {
      channelIDs.push(mention.id)
    })
    
    console.log(content)
    console.log(title)
    for (const channelID of channelIDs) {
      sendToChannel(bot, channelID, title, content, channelIDs, image)
    }
    // msg.reply(`to: ${to}\n content: ${content}`)



    // for (const mention of mentions) {
    //   if (mention.includes("<#")) {
    //     let chat = mention.slice(2, mention.length - 1)
    //     mentioned_chats.push(chat)
    //   }
    // }
  } 


  // - -- --- < Add Admin > --- -- -

  else if (msg.content.startsWith(`${prefix}addAdmin`)) {
    if (!is_main) {
      if (is_admin) {
        msg.reply("[!] You are not authorized as Main, this incident will be reported.")
        await bot.users.fetch(MAIN_ADMIN_ID)
        .then((owner) => {
          owner.send(`Admin <@${msg.author.id}> with id= \`${msg.author.id}\` in server=\`${guild.name}\` Tried to add Admin. `)
        })
        .catch((err) => {
          bot.channels.cache.get(ADMIN_CHAT_ID).send(err.message)
        })
      } else
        msg.reply("[!] You are not authorized as Owner")
      return
    }
    uid = msg.content.split('addAdmin ')[1]
    // admins.push(uid)
    addAdmin(Number(uid))
    msg.reply(`\`\`\`css\n @user with id: \`${uid}\` added as Admin. \n\`\`\``)
    // console.log(admins);
  }

// - -- --- < ---- > --- -- -

  else if (msg.content.startsWith(`${prefix}rmAdmin`)) {
    if (!is_admin) {
      msg.reply("[!] You are not authorized as Admin")
      return
    }

    uid = msg.content.split('rmAdmin ')[1]
    rmAdmin(Number(uid))
    // let adminindex = admins.indexOf(uid);
    // admins.splice(adminindex, 1);
    msg.reply(`\`\`\`css\n @user with id: \`${uid}\` removed from Admins. \n\`\`\``)

  }

  // - -- --- < ---- > --- -- -
  // console.log(msg);
  // - -- --- < ---- > --- -- -

  const args = msg.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  switch (command) {
    case 'test':
      bot.commands.get('test').execute(msg, args)

    case 'join':
      if (!is_admin) {
        msg.reply("[!] You are not authorized as Admin")
        return
      }
      bot.commands.get('join').execute(msg, args)
      break

    case 'leave':
      if (!is_admin) {
        msg.reply("[!] You are not authorized as Admin")
        return
      }
      bot.commands.get('leave').execute(msg, args)
      break


    case 'help':
      bot.commands.get('help').execute(msg, args)
      break
  }
})

bot.login(TOKEN)
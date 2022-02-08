require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] })
const handlers = ['command_handler', 'event_handler', 'function_handler', 'component_handler']
// - -- --- < ---- > --- -- -
bot.commands = new Discord.Collection()
bot.events = new Discord.Collection()
bot.functions = new Discord.Collection()
bot.components = new Discord.Collection()
// - -- --- < ---- > --- -- -
handlers.forEach(handler => {
  require(`./handlers/${handler}`)(bot, Discord)
})


TOKEN = process.env.TOKEN
bot.login(TOKEN)
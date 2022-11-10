require('dotenv').config();
const Discord = require('discord.js');
require('discord-buttons')(client);

const bot = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMembers,
	],
});
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
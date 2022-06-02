const Discord = require('discord.js');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

module.exports = async (comp) => {
    
    comp.label = "Done!"
    comp.disabled = true
    comp.style = "SUCCESS"
}
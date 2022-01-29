const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const prefix = (process.env.PREFIX.length > 0) ? process.env.PREFIX : "$"


module.exports = {
    name: 'help',
    description: "this is a bullshit command",
    execute(msg, args) {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Twitch', 'https://cdn.discordapp.com/attachments/820259991955963945/922443765006880838/twitch_macos_bigsur_icon_189608.png', 'https://www.twitch.tv/bardia_bsh')
        // .setDescription(message)
        .setThumbnail('https://cdn.discordapp.com/attachments/820259991955963945/923045886546821150/discord_alt_macos_bigsur_icon_190236.png')
        .addFields(
            { name: `Command: __**\`${prefix}send\` **__\nDescription: \`Send message to a chat\``, value: `Usage: **\`\`\`${prefix}send -\n<image_url> -\n<title> -\n<message here> \n<mention chats> \`\`\`**`,  },
            { name: '\u200B', value: '\u200B' },

            { name: `__**${prefix}join **__:`, value: `\n**\`${prefix}join <voiceid> \`**`, inline: true },
            { name: `__**${prefix}leave **__:`, value: `\n**\`${prefix}leave\`**`, inline: true },
        )
        .setImage('https://cdn.discordapp.com/attachments/899049933221531679/916085837832278016/55.gif')
        .setTimestamp()
        .setFooter('Bardia_BSH', 'https://cdn.discordapp.com/attachments/820259991955963945/920580334368731136/NEMESIS_TEAM_LOGO.jpg');
    
        msg.channel.send({ embeds: [helpEmbed] });
    }
}
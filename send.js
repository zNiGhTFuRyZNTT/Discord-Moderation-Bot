const Discord = require('discord.js');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });



function sendToChannel(bot, channel_id, title, message, channelIDs, image_url) {
	let tags = []
	for (let i = 1; i < channelIDs.length+1; i++) {
		if (i % 2 == 0)
			tags.push('\n<#'+channelIDs[i-1]+'>')
		else
			tags.push('<#'+channelIDs[i-1]+'>')
	}
	image_url = image_url ? image_url : 'https://cdn.discordapp.com/attachments/901856543992057886/911978589686202428/purplebar.gif'
	
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	// .setTitle('Message From Quera')
	.setURL('https://www.quera.org')
	.setAuthor('Quera', 'https://cdn.discordapp.com/icons/872756724908560404/9e61fb1b71b94c421347c5ff7366bf0c.png?size=1024', 'https://www.quera.ir')
	// .setDescription(message)
	.setThumbnail('https://cdn.discordapp.com/attachments/813485505697021962/936588339245645864/QUERA_PNG.png')
	.addFields(
		{ name: `**${title}**`, value: `${message}`,  },
		{ name: '\u200B', value: '\u200B' },
		{ name: `\u200B`, value: `${tags.join(' ')}`,},
	)
	.setImage(`${image_url}`)
	.setTimestamp()
	.setFooter('Quera Discord Team', 'https://cdn.discordapp.com/attachments/820259991955963945/920580334368731136/NEMESIS_TEAM_LOGO.jpg');

    bot.channels.cache.get(channel_id).send({ embeds: [exampleEmbed] });
}

module.exports = {
    sendToChannel: sendToChannel
}
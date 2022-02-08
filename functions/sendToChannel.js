const Discord = require('discord.js');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });


module.exports = async (bot, msg, channelIDs) => {
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
	
	let tags = []
	for (let i = 1; i < channelIDs.length+1; i++) {
		if (i % 2 == 0)
			tags.push('\n<#'+channelIDs[i-1]+'>')
		else
			tags.push('<#'+channelIDs[i-1]+'>')
	}
	image = image ? image : 'https://cdn.discordapp.com/attachments/901856543992057886/911978589686202428/purplebar.gif'

	const Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setURL('https://www.quera.org')
	.setAuthor({name: 'Quera', iconURL: 'https://cdn.discordapp.com/icons/872756724908560404/9e61fb1b71b94c421347c5ff7366bf0c.png?size=1024', url: 'https://www.quera.ir'})
	.setThumbnail('https://cdn.discordapp.com/attachments/813485505697021962/936588339245645864/QUERA_PNG.png')
	.addFields(
		{ name: `**${title}**`, value: `${content}`,  },
		{ name: '\u200B', value: '\u200B' },
		{ name: `\u200B`, value: `${tags.join(' ')}`,},
	)
	.setImage(`${image}`)
	.setTimestamp()
	.setFooter({text: 'Quera Discord Team', iconURL: 'https://cdn.discordapp.com/attachments/820259991955963945/920580334368731136/NEMESIS_TEAM_LOGO.jpg'});

	try {
		for (const id of channelIDs) {
    		bot.channels.cache.get(id).send({ embeds: [Embed] })
		}
	} catch (err) {
		msg.reply(`Error Sending message:\n\t\t|-> ${err}`)
	}
}
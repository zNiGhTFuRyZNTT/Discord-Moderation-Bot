const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = (msg) => {
    const choices_btns = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId(`warn-btn-${msg.id}-${msg.author.id}-${msg.channel.id}`)
        .setLabel('Warn')
        .setStyle('DANGER')
    )
    .addComponents(
        new MessageButton()
        .setCustomId(`delete-btn-${msg.id}-${msg.author.id}-${msg.channel.id}`)
        .setLabel('Remove from chat')
        .setStyle('SECONDARY')
    )
    .addComponents(
        new MessageButton()
        .setCustomId(`mute-btn-${msg.id}-${msg.author.id}-${msg.channel.id}`)
        .setLabel('Mute')
        .setStyle('DANGER')
    )
    .addComponents(
        new MessageButton()
        .setCustomId(`pass-btn-${msg.id}-${msg.author.id}-${msg.channel.id}`)
        .setLabel('Pass')
        .setStyle('SUCCESS')
    )

    return choices_btns
}

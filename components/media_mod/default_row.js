const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = (interaction) => {
    const targetMsgId = interaction.customId.split('-')[2]
    const targetUserId = interaction.customId.split('-')[3]
    const targetChannelId = interaction.customId.split('-')[4]

    const defaultRow = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId(`warn-btn-${targetMsgId}-${targetUserId}-${targetChannelId}`)
      .setLabel('Warn')
      .setStyle('DANGER')
    )
    .addComponents(
      new MessageButton()
      .setCustomId(`delete-btn-${targetMsgId}-${targetUserId}-${targetChannelId}`)
      .setLabel('Remove from chat')
      .setStyle('SECONDARY')
    )
    .addComponents(
      new MessageButton()
      .setCustomId(`mute-btn-${targetMsgId}-${targetUserId}-${targetChannelId}`)
      .setLabel('Mute')
      .setStyle('DANGER')
    )
    .addComponents(
      new MessageButton()
      .setCustomId(`pass-btn-${targetMsgId}-${targetUserId}-${targetChannelId}`)
      .setLabel('Pass')
      .setStyle('SUCCESS')
    )

    return defaultRow
}

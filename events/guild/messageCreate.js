require('dotenv').config()
const { isAdmin } = require('../../database/database');
const MAIN_ADMIN_ID = (process.env.MAIN_ADMIN_ID.length > 0) ? process.env.MAIN_ADMIN_ID : null

module.exports = async (Discord, bot, msg) => {
  console.log(msg.content);
  if (msg.author.bot) return
  if (MAIN_ADMIN_ID == null)
    msg.reply("[❗] This bot doesn't work without an owner")

  // - -- --- < ---- > --- -- -

  let prefix = (process.env.PREFIX.length > 0) ? process.env.PREFIX : "$"
  const msg_author = msg.author.id
  const is_auth = await isAdmin(Number(msg_author))
  const is_admin = (msg_author === MAIN_ADMIN_ID) || is_auth ? true : false
  const mediaLogChannel = bot.channels.cache.get(process.env.MEDIA_LOG_CHANNEL_ID)
  const media_mod_btns = bot.components.get('media_main')(msg)

  function seperate() {
    const mediaLogChannel = bot.channels.cache.get(process.env.MEDIA_LOG_CHANNEL_ID)
    mediaLogChannel.send(`https://media.discordapp.net/attachments/818028244916895744/936594581296930877/20210510_185705.gif`)
  }
  //           - -- --- < ---- > --- -- -
  // - -- --- < Execute defined Commands  > --- -- -
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).split(/ +/)
    let command = args.shift().toLowerCase()
    command = bot.commands.get(command)
    if (!command) return
    try {
      if (!is_admin) {
        msg.reply(`|❗|-> You are not authorized as Admin`)
        return
      }
      await command.execute(msg, args, bot)
    } catch (err) {
      console.error(err)
      msg.reply(`|❌|-> FAILED EXECUTING COMMAND`)
    }
  } else {
    // bot.channels.cache.get(msg.channelId).messages.fetch(msg.id).then(message => message.delete({ timeout: 20000}))
    try {
      if (msg.embeds.length > 0) {
        // mediaLogChannel.send(`Sent By <@!${msg.author.id}> \n${msg.embeds[0].url}`)
        log_media = bot.functions.get('log_media')
        log_media(mediaLogChannel, msg.author.id, msg.embeds[0].url, msg.channelId, media_mod_btns)
        seperate()
      }
      msg.attachments.map(attachment => {
        // console.log(attachment.url)
        if (msg.content.startsWith('http')) {

          mediaLogChannel.send({
            content: `Sent By <@!${msg.author.id}> to <#${msg.channel.id}> \n${attachment.url}`,
            components: [media_mod_btns]
          })
          seperate()
          return
        }
        if (['video/quicktime', 'video/mp4', 'video/x-matroska', 'application/x-msi', 'application/x-msdos-program', null].indexOf(attachment.contentType) >= 0) {
          seperate()

          mediaLogChannel.send({
            content: `Sent By <@!${msg.author.id}> to <#${msg.channel.id}> \n${attachment.url}`,
            components: [media_mod_btns]
          })
          seperate()
          return
        } else {
          log_media = bot.functions.get('log_media')
          log_media(mediaLogChannel, msg.author.id, attachment.url, msg.channelId, media_mod_btns)
          seperate()
          return
        }
      })
      return

    } catch (e) {
      mediaLogChannel.send('Error sending Media')
      console.log(e);
      // console.log(mediaLogChannel);
    }

  }


}
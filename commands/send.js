require('dotenv').config()
const { isAdmin } = require('../database/database')
const MAIN_ADMIN_ID = (process.env.MAIN_ADMIN_ID.length > 0) ? process.env.MAIN_ADMIN_ID : null

module.exports = {
    name: 'send',
    description: "Sends an Embed Message to mentioned text channels",
    async execute(msg, args, bot = null) {
        const msg_author = msg.author.id
        const is_auth = await isAdmin(Number(msg_author))
        const is_admin = (msg_author === MAIN_ADMIN_ID) || is_auth ? true : false

        if (!is_admin) {
            msg.reply("[!] You are not authorized as Admin")
            return
        }
        let mentioned_chats = msg.mentions.channels
        channelIDs = []
        mentioned_chats.forEach(mention => {
        channelIDs.push(mention.id)
        })

        const sendToChannel = bot.functions.get('sendToChannel')
        sendToChannel(bot, msg, channelIDs)

        msg.reply(`[>] message send ✅\n channels: ${channelIDs.map(id => {
        return `<#${id}>`
        }).join(' ')}`)
      
    }
}
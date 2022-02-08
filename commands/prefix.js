require('dotenv').config()
const { isAdmin } = require('../database/database')
const MAIN_ADMIN_ID = (process.env.MAIN_ADMIN_ID.length > 0) ? process.env.MAIN_ADMIN_ID : null

module.exports = {
    name: 'prefix',
    description: "Changes the bot prefix",
    async execute(msg, args, bot = null) {
        const msg_author = msg.author.id
        const is_auth = await isAdmin(Number(msg_author))
        const is_admin = (msg_author === MAIN_ADMIN_ID) || is_auth ? true : false
        if (!is_admin) {
            msg.reply("[!] You are not authorized as Admin")
            return
        }

        prefix = args[0]
        bot.user.setActivity(`${prefix}help`, {
        type: "LISTENING"
        })
        msg.reply(`[🍑] Prefix is now set to ${prefix}`)
    }
}
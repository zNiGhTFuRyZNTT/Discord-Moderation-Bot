let prefix = (process.env.PREFIX.length > 0) ? process.env.PREFIX : "$"
module.exports = (Discord, bot) => {
    console.info(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`${prefix}help`, {
      type: "LISTENING"
    })
}
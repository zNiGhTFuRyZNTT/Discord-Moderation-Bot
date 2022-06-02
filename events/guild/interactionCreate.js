require('dotenv').config()
const deleter_token = process.env.DELETER_TOKEN
var axios = require('axios');

instances = []
class History {
  constructor(msgId, lastComp) {
    this.msgId = msgId
    this.lastComp = lastComp

  }
  _save_to = (arr) => {
    arr.push(this)
  }

}


module.exports = async (Discord, bot, interaction) => {
  // console.log(interaction)
  if (!interaction.isButton()) return;
  const action = interaction.customId.split('-')[0]

  const targetMsgId = interaction.customId.split('-')[2]
  const targetUserId = interaction.customId.split('-')[3]
  const targetChannelId = interaction.customId.split('-')[4]

  const finalComp = bot.components.get('default_row')(interaction)
  const to_done = bot.functions.get('to_done')
  //  ------------------
  const warn = bot.components.get('warnEmbed')()
  const mutedEmbed = bot.components.get('mutedEmbed')(interaction.user.id)

  // > ----<  ---------------------------- >----

  let lastAcRow = instances.filter(instance => instance.msgId === targetMsgId)
  let lastComp = lastAcRow.length > 0 ? lastAcRow[0].lastComp : false

  // console.log(lastComp);
  switch (action) {
    case 'warn':
      // console.log(instances)
      console.log(warn)

      await bot.users.fetch(targetUserId)
        .then((user) => {
          user.send({
            embeds: [warn]
          })

          if (lastComp) {
            to_done(lastComp.components[0])
            const compIndex = instances.indexOf(lastAcRow[0])
            if (compIndex > -1) {
              instances.splice(compIndex, 1)
              // instances[compIndex] = 0
              new History(targetMsgId, lastComp)._save_to(instances)
            } else {
              new History(targetMsgId, lastComp)._save_to(instances)
            }
            interaction.update({
              components: [
                lastComp
              ]
            })
          } else {
            to_done(finalComp.components[0])
            new History(targetMsgId, finalComp)._save_to(instances)
            interaction.update({
              components: [
                finalComp
              ]
            })

          }
        })
        .catch((err) => {
          console.error(err)
          interaction.reply(`Failed to ${action} warn user, err|> ${err.message}`)
        })
      break


    case 'pass':
      // console.log(interaction)
      var config = {
        method: 'delete',
        url: `https://discord.com/api/v9/channels/${targetChannelId}/messages/${interaction.message.id}`,
        headers: {
          'authorization': deleter_token,
          'x-super-properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk4LjAuNDc1OC44NyBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiOTguMC40NzU4Ljg3Iiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL3d3dy5nb29nbGUuY29tLyIsInJlZmVycmluZ19kb21haW4iOiJ3d3cuZ29vZ2xlLmNvbSIsInNlYXJjaF9lbmdpbmUiOiJnb29nbGUiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTEzNTg0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==',
          'Cookie': '__dcfduid=c192e80b1ac511ecaf3142010a0a02e9; __sdcfduid=c192e80b1ac511ecaf3142010a0a02e97354000cfad9666b18e1ac2a3ba4b39f9ae59ee5b3c3f3d08eb4cee4a353435b'
        }
      }
      
      axios(config)
        .catch((err) => console.log(err.message))

      break


    case 'delete':
      var config = {
        method: 'delete',
        url: `https://discord.com/api/v9/channels/${targetChannelId}/messages/${targetMsgId}`,
        headers: {
          'authorization': deleter_token,
          'x-super-properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk4LjAuNDc1OC44NyBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiOTguMC40NzU4Ljg3Iiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL3d3dy5nb29nbGUuY29tLyIsInJlZmVycmluZ19kb21haW4iOiJ3d3cuZ29vZ2xlLmNvbSIsInNlYXJjaF9lbmdpbmUiOiJnb29nbGUiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTEzNTg0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==',
          'Cookie': '__dcfduid=c192e80b1ac511ecaf3142010a0a02e9; __sdcfduid=c192e80b1ac511ecaf3142010a0a02e97354000cfad9666b18e1ac2a3ba4b39f9ae59ee5b3c3f3d08eb4cee4a353435b'
        }
      }
      axios(config)
        .then(function (response) {
          console.log("[>] Message delete success")
          console.log(lastComp);
          if (lastComp) {
            to_done(lastComp.components[1])
            const compIndex = instances.indexOf(lastAcRow[0])
            if (compIndex > -1) {
              instances.splice(compIndex, 1)
              // instances[compIndex] = 0
              new History(targetMsgId, lastComp)._save_to(instances)
            } else {
              new History(targetMsgId, lastComp)._save_to(instances)
            }
            interaction.update({
              components: [
                lastComp
              ]
            })
          } else {
            to_done(finalComp.components[1])
            new History(targetMsgId, finalComp)._save_to(instances)
            interaction.update({
              components: [
                finalComp
              ]
            })

          }
        })

        .catch(function (error) {
          console.log("[>] Message delete Failed")
          console.log(error)


        })
      break
    case 'mute':
      const user = await interaction.member.guild.members.fetch(targetUserId)
      const role = interaction.member.guild.roles.cache.find(role => role.id === "913636091293212722");
      user.roles.add(role)
      user.send({ embeds: [mutedEmbed] }).then(() => {})
      console.log(`[>] User ${user.username} Muted`)

      if (lastComp) {
        to_done(lastComp.components[2])
        const compIndex = instances.indexOf(lastAcRow[0])
        if (compIndex > -1) {
          instances.splice(compIndex, 1)
          // instances[compIndex] = 0
          new History(targetMsgId, lastComp)._save_to(instances)
        } else {
          new History(targetMsgId, lastComp)._save_to(instances)
        }
        interaction.update({
          components: [
            lastComp
          ]
        })
      } else {
        to_done(finalComp.components[2])
        new History(targetMsgId, finalComp)._save_to(instances)
        interaction.update({
          components: [
            finalComp
          ]
        })

      }
      break
  }
}
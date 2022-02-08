require('dotenv').config()
const { MessageActionRow, MessageButton } = require('discord.js')
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
  const cmdChannelId = '899186818711429180'
  const cmdChannel = bot.channels.cache.get(cmdChannelId)

  const action = interaction.customId.split('-')[0]

  const targetMsgId = interaction.customId.split('-')[2]
  const targetUserId = interaction.customId.split('-')[3]
  const targetUser = bot.users.cache.get(targetUserId)
  const targetChannelId = interaction.customId.split('-')[4]
  //  ------------------
  const mutedRoleId = '913636091293212722'
  const warn_msg = `لطفا از ارسال هرگونه محتوا غیر اخلاقی در سرور Quera خودداری نمایید.
  در صورت تکرار شما در سرور محدود خواهید شد.
  با تشکر🌹` 

// > ----<  ---------------------------- >----
const warn = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setURL('https://www.quera.org')
  .setAuthor({name: 'Quera', iconURL: 'https://cdn.discordapp.com/icons/872756724908560404/9e61fb1b71b94c421347c5ff7366bf0c.png?size=1024', url: 'https://www.quera.ir'})
  .addFields(
    { name: `**اخطار**`, value: `${warn_msg}`,  },
  )
  .setTimestamp()
  .setFooter({text: 'Quera Discord Team', iconURL: 'https://cdn.discordapp.com/attachments/820259991955963945/920580334368731136/NEMESIS_TEAM_LOGO.jpg'});
  
  // > ----<  ---------------------------- >----

  const muted_warn_msg = `شما به دلیل ارسال محتوا نامناسب رول Muted دریافت کردید و قادر به چت در سرور Quera نخواهید بود!
  لطفا برای رسیدگی با یکی از ادمینها درباره این موضوع صحبت کنید.🌹`
  const muted_warn = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setURL('https://www.quera.org')
  .setAuthor({name: 'Quera', iconURL: 'https://cdn.discordapp.com/icons/872756724908560404/9e61fb1b71b94c421347c5ff7366bf0c.png?size=1024', url: 'https://www.quera.ir'})
  .addFields(
    { name: `**اخطار**`, value: `${muted_warn_msg}`,  },
  )
  .setTimestamp()
  .setFooter({text: 'Quera Discord Team', iconURL: 'https://cdn.discordapp.com/attachments/820259991955963945/920580334368731136/NEMESIS_TEAM_LOGO.jpg'});


  // > ----<  ---------------------------- >----
  // ...
  
    const finalComp = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId(`warn-btn-${targetMsgId}-${targetUserId}-${targetChannelId}`)
        .setLabel('Warn')
        .setStyle('DANGER')
      )
      // .addComponents(
      //   new MessageButton()
      //   .setCustomId(`mute-btn-${targetMsgId}-${targetUserId}-${targetChannelId}`)
      //   .setLabel('Mute')
      //   .setStyle('SECONDARY')
      // )
      .addComponents(
        new MessageButton()
          .setCustomId(`delete-btn-${targetMsgId}-${targetUserId}-${targetChannelId}`)
          .setLabel('Remove from chat')
          .setStyle('DANGER')
      )
      .addComponents(
        new MessageButton()
        .setCustomId(`pass-btn-${targetMsgId}-${targetUserId}-${targetChannelId}`)
        .setLabel('Pass')
        .setStyle('SUCCESS')
      )

      // console.log(instances)
      function to_done(comp) {
        comp.label = "Done!"
        comp.disabled = true
        comp.style = "SUCCESS"
      }

      let lastAcRow = instances.filter(instance => instance.msgId === targetMsgId)
      let lastComp = lastAcRow.length > 0 ? lastAcRow[0].lastComp : false

      // console.log(lastComp);
  switch (action) {
      case 'warn':
          console.log(instances)
          // targetUser.send({ embeds: [warn] })
          await bot.users.fetch(targetUserId) 
          .then((user) => {
            // user.send({ embeds: [warn] })

            if (lastComp) {
              to_done(lastComp.components[0])
              const compIndex = instances.indexOf(lastAcRow[0])
              if (compIndex > -1) {
                instances.splice(compIndex, 1)
                // instances[compIndex] = 0
                new History(targetMsgId, lastComp)._save_to(instances)
              }
              else {
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
        console.log(interaction);
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
            }
            else {
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


        }) 

  }
}

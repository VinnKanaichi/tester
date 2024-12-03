const fetch = require('node-fetch')

let handler = async (m, { hanz, command }) => {
let cap = `Untuk Menghindari Admin Group Marah :'v\nSilahkan Cek Chat Private Bot Untuk Link Group Nya`
hanz.sendMessage(m.chat, {
      text: cap,
      contextInfo: {
      externalAdReply: {
      title: global.botName,
      body: global.wm,
      thumbnailUrl: 'https://telegra.ph/file/4c55f8a0fd4edd4f24a62.jpg',
      mediaType: 1,
      renderLargerThumbnail: true
      }}})
      hanz.reply(m.sender, `Grub Rangel - Multidevice\n\n${global.sgc}`, m)
}
handler.command = /^(gcbot|gcrangel)$/i
handler.tags = ['main']
handler.help = ['gcbot']
handler.limit = false

module.exports = handler
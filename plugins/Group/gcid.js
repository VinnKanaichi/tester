let handler = async (m, {hanz, groupMetadata }) => {
hanz.reply(m.chat, `${await groupMetadata.id}`, m)
}
handler.help = ['cekid']
handler.tags = ['group']
handler.command = /^(cekid|idgc|gcid)$/i

handler.group = true

module.exports = handler  
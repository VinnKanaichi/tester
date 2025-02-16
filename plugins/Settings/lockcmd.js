let handler = async (m, { hanz, text, usedPrefix, command }) => {
    if (!m.quoted) throw 'Reply Pesan!'
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    let sticker = global.db.data.users[m.sender].sticker
    let hash = m.quoted.fileSha256.toString('hex')
    if (!(hash in sticker)) throw 'Hash not found in database'
    sticker[hash].locked = !/^un/i.test(command)
    m.reply('Done!')
} 
handler.help = ['unlockcmd', 'lockcmd']
handler.tags = ['database', 'premium']
handler.command = /^(un)?lockcmd$/i
handler.premium = true

module.exports = handler
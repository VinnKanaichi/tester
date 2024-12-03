const fs = require('fs')
let timeout = 120000
let poin = 4999
let handler = async (m, { hanz, usedPrefix }) => {
    hanz.game = hanz.game ? hanz.game: {}
    let id = 'tebakbendera-' + m.chat
    if (id in hanz.game) return hanz.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', hanz.game[id][0])
    let src = JSON.parse(fs.readFileSync('./lib/game/tebakbendera.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
Silahkan Tebak Bendera Di Atas...

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}teben untuk bantuan
Bonus: ${poin} XP
`.trim()
    hanz.game[id] = [
        await hanz.sendFile(m.chat, json.img, 'tebakbendera.jpg', caption, m),
        json, poin,
        setTimeout(() => {
            if (hanz.game[id]) hanz.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, hanz.game[id][0])
            delete hanz.game[id]
        }, timeout)
    ]
}
handler.help = ['tebakbendera']
handler.tags = ['game']
handler.command = /^tebakbendera$/i

handler.onlyprem = true
handler.game = true

module.exports = handler
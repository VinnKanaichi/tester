const fs = require('fs')
let timeout = 120000
let poin = 4999
let handler = async (m, { hanz, usedPrefix }) => {
    hanz.caklontong = hanz.caklontong ? hanz.caklontong : {}
    let id = m.chat
    if (id in hanz.caklontong) return hanz.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', hanz.caklontong[id][0])
    let src = JSON.parse(fs.readFileSync('./lib/game/caklontong.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}calo untuk bantuan
Bonus: ${poin} XP
`.trim()
    hanz.caklontong[id] = [
        await hanz.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (hanz.caklontong[id]) await hanz.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n${json.deskripsi}`, hanz.caklontong[id][0])
            delete hanz.caklontong[id]
        }, timeout)
    ]
}
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^caklontong/i
handler.onlyprem = true
handler.game = true
module.exports = handler
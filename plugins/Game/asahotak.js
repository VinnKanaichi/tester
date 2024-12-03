const fs = require('fs')
let timeout = 120000
let poin = 4999
let handler = async (m, { hanz, command, usedPrefix }) => {
    hanz.game = hanz.game ? hanz.game : {}
    let id = 'asahotak-' + m.chat
    if (id in hanz.game) return hanz.reply(m.chat, 'Masih ada pertanyaan belum terjawab di chat ini', hanz.game[id][0])
    let src = JSON.parse(fs.readFileSync('./lib/game/asahotak.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = Ehztext(`
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hotak untuk hotak
Bonus: ${poin} XP
`).trim()
    hanz.game[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(() => {
            if (hanz.game[id]) hanz.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, hanz.game[id][0])
            delete hanz.game[id]
        }, timeout)
    ]
}
handler.help = ['asahotak']
handler.tags = ['game']
handler.command = /^asahotak$/i
handler.onlyprem = true
handler.game = true

module.exports = handler
let handler = async (m, { hanz }) => {
    hanz.caklontong = hanz.caklontong ? hanz.caklontong : {}
    let id = m.chat
    if (!(id in hanz.caklontong)) throw false
    let json = hanz.caklontong[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[AIUEO]/gi, '_')
    m.reply('```' + clue + '```' + '\n\n*Jangan Balas Chat Ini Tapi Balas Soalnya*')
}
handler.command = /^calo$/i
module.exports = handler
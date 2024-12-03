const threshold = 0.72
async function before(m, { hanz }) {
    let id = m.chat
 
    hanz.caklontong = hanz.caklontong ? hanz.caklontong : {}
   
    if (hanz.caklontong[id]) {
        let json = JSON.parse(JSON.stringify(hanz.caklontong[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += hanz.caklontong[id][2]
            await hanz.reply(m.chat, `*Benar!* +${hanz.caklontong[id][2]} XP\n${json.deskripsi}`, m)
            clearTimeout(hanz.caklontong[id][3])
            delete hanz.caklontong[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold){
            m.reply(`*Dikit Lagi!*`)
        } else if(m.body.includes('yerah')){
            m.reply('Yah nyeraah :(')
            delete hanz.caklontong[id]
        } else m.reply(`*Salah!*`)
    }
   
}
module.exports = { before, exp: 0 };
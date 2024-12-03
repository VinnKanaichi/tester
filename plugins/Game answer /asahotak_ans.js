const threshold = 0.72;

async function before(m, { hanz }) {
    

    hanz.game = hanz.game || {};
let id = 'asahotak-' + m.chat;
    if (!(id in hanz.game)) return true;
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
    if (isSurrender) {
        clearTimeout(hanz.game[id][3]);
        delete hanz.game[id];
        return m.reply('*Yah Menyerah :( !*');
    }

    let json = hanz.game[id] ? JSON.parse(JSON.stringify(hanz.game[id][1])) : "";

    if (hanz.game[id] && m.text.toLowerCase() === json.jawaban.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += hanz.game[id][2];
        m.reply(`*Benar!*\n+${hanz.game[id][2]} XP`);
        clearTimeout(hanz.game[id][3]);
        delete hanz.game[id];
    } else if (
        hanz.game[id] && 
        similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold
    ) {
        m.reply(`*Dikit Lagi!*`);
    } else if (hanz.game[id]) {
        m.reply(`*Salah!*`);
    }
}

module.exports = { before, exp: 0 };

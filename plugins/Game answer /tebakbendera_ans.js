
const threshold = 0.72;

async function before(m, { hanz }) {
    let id = 'tebakbendera-' + m.chat;

    // Validasi pesan yang dikutip
    if (
        !m.quoted ||
        !m.quoted.fromMe ||
        !m.quoted.isBaileys ||
        !m.text ||
        !/Ketik.*teben/i.test(m.quoted.text) ||
        /.*teben/i.test(m.text)
    ) {
        return true;
    }

    hanz.game = hanz.game ? hanz.game : {};
    if (!(id in hanz.game)) {
        return m.reply('Soal itu telah berakhir');
    }

    if (m.quoted.id === hanz.game[id][0].id) {
        const isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);

        if (isSurrender) {
            clearTimeout(hanz.game[id][3]);
            delete hanz.game[id];
            return m.reply('*Yah Menyerah :( !*');
        }

        const json = JSON.parse(JSON.stringify(hanz.game[id][1]));

        if (m.text.toLowerCase() === json.name.toLowerCase().trim()) {
            // Tambahkan XP ke pengguna jika jawaban benar
            if (global.db?.data?.users?.[m.sender]) {
                global.db.data.users[m.sender].exp += hanz.game[id][2];
            }
            m.reply(`*Benar!*\n+${hanz.game[id][2]} XP`);
            clearTimeout(hanz.game[id][3]);
            delete hanz.game[id];
        } else if (
            similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold
        ) {
            m.reply(`*Dikit Lagi!*`);
        } else {
            m.reply(`*Salah!*`);
        }
    }
    return true;
}

module.exports = {
    before,
    exp: 0,
};

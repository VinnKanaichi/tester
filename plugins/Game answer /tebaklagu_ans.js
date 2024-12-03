const threshold = 0.72;

async function before(m, { hanz }) {
  hanz.game = hanz.game ? hanz.game : {};
  let id = "tebaklagu-" + m.chat;
  if (id in hanz.game) {
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.body);
    if (isSurrender) {
      clearTimeout(hanz.game[id][3]);
      delete hanz.game[id];
      return m.reply("*Yah Menyerah :( !*");
    }
    let json = JSON.parse(JSON.stringify(hanz.game[id][1]));
    if (m.body.toLowerCase() == json.judul.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += hanz.game[id][2];
      m.reply(`*Benar!*\nSelamat Anda Mendapatkan\n+${hanz.game[id][2]} XP`);
      clearTimeout(hanz.game[id][3]);
      delete hanz.game[id];
    } else if (
      similarity(m.body.toLowerCase(), json.judul.toLowerCase().trim()) >=
      threshold
    )
      m.reply(`*Dikit Lagi!*`);
    else m.reply(`*Salah!*`);
  }
}

module.exports = { before, exp: 0 };

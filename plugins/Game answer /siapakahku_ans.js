const threshold = 0.72;
let handler = (m) => m;
handler.before = async function (m, { hanz }) {
  let id = "siapakahaku-" + m.chat;
  hanz.game = hanz.game ? hanz.game : {};
  if (id in hanz.game) {
    let json = JSON.parse(JSON.stringify(hanz.game[id][1]));
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += hanz.game[id][2];
      m.reply(`*Benar!*\n+${hanz.game[id][2]} XP`);
      clearTimeout(hanz.game[id][3]);
      delete hanz.game[id];
    } else if (
      similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >=
      threshold
    )
      m.reply(`*Dikit Lagi!*`);
    else m.reply(`*Salah!*`);
  }
};
handler.exp = 0;
module.exports = handler;

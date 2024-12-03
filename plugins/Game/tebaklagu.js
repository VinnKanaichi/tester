const fs = require('fs-extra')
let timeout = 120000;
let poin = 4999;
let handler = async (m, { hanz, command, usedPrefix }) => {
  hanz.game = hanz.game ? hanz.game : {};
  let id = "tebaklagu-" + m.chat;
  if (id in hanz.game)
    return hanz.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      hanz.game[id][0]
    );
  let src = JSON.parse(fs.readFileSync("./lib/game/tebaklagu.json", "utf-8"));
  let json = src[Math.floor(Math.random() * src.length)];
  let caption = Ehztext(`
Artist: ${json.artis}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hlagu untuk bantuan
Bonus: ${poin} XP
`).trim();
  hanz.game[id] = [
    await m.reply(caption),
    json,
    poin,
    setTimeout(() => {
      if (hanz.game[id])
        hanz.reply(
          m.chat,
          `Waktu habis!\nJawabannya adalah *${json.judul}*`,
          hanz.game[id][0]
        );
      delete hanz.game[id];
    }, timeout),
  ];
  await hanz.sendFile(m.chat, json.lagu, "tebaklagu.mp3", "", hanz.game[id][0]);
};
handler.help = ["tebaklagu"];
handler.tags = ["game"];
handler.command = /^tebaklagu$/i;
handler.onlyprem = true;
handler.game = true;

module.exports = handler;

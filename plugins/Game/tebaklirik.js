const fs = require('fs-extra')
let timeout = 120000;
let poin = 4999;
let handler = async (m, { hanz, command, usedPrefix }) => {
  hanz.game = hanz.game ? hanz.game : {};
  let id = "tebaklirik-" + m.chat;
  if (id in hanz.game)
    return hanz.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      hanz.game[id][0]
    );
  let src = JSON.parse(fs.readFileSync("./lib/game/tebaklirik.json", "utf-8"));
  let json = src[Math.floor(Math.random() * src.length)];
  let caption = Ehztext(`
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}terik untuk bantuan
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
          `Waktu habis!\nJawabannya adalah *${json.jawaban}*`,
          hanz.game[id][0]
        );
      delete hanz.game[id];
    }, timeout),
  ];
};
handler.help = ["tebaklirik"];
handler.tags = ["game"];
handler.command = /^tebaklirik$/i;

handler.onlyprem = true;
handler.game = true;

module.exports = handler;

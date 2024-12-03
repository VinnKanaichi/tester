const fs = require('fs-extra')
let timeout = 120000;
let poin = 4999;
let handler = async (m, { hanz, command, usedPrefix }) => {
  hanz.game = hanz.game ? hanz.game : {};
  let id = "tebakgambar-" + m.chat;
  if (id in hanz.game)
    return hanz.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      hanz.game[id][0]
    );
  let src = JSON.parse(fs.readFileSync("./lib/game/tebakgambar.json", "utf-8"));
  let json = src[Math.floor(Math.random() * src.length)];
  let caption = `
${json.deskripsi}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hgamb untuk bantuan
Bonus: ${poin} XP
`.trim();
  hanz.game[id] = [
    await hanz.sendMessage(
      m.chat,
      {
        image: { url: json.img },
        fileName: "tebakgambar.jpg",
        mimetype: "image/jpeg",
        caption: caption,
      },
      { quoted: m }
    ),
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
handler.help = ["tebakgambar"];
handler.tags = ["game"];
handler.command = /^tebakgambar$/i;
handler.onlyprem = true;
handler.game = true;

module.exports = handler;

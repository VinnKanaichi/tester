const fetch = require('node-fetch');

let handler = async (m, { hanz}) => {
  let winScore = 1000;
  let id = m.chat;
hanz.family = hanz.family || {}; 
    
  if (id in hanz.family) return m.reply('Masih ada kuis yang belum terjawab di chat ini.');

  // Ambil data soal dari sumber eksternal
  let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')).json();
  let json = src[Math.floor(Math.random() * src.length)];

  let caption = Ehztext(`*Soal:* ${json.soal}

Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}

+${winScore} Money tiap jawaban benar
`.trim());

  // Simpan data kuis ke dalam objek family
  hanz.family[id] = {
    id,
    msg: await m.reply(caption),
    ...json,
    terjawab: Array.from(json.jawaban, () => false),
    winScore,
  };

  // Kurangi limit pengguna
  db.data.users[m.sender].glimit -= 1;
};

handler.help = ['family100'];
handler.tags = ['game'];
handler.command = /^family100$/i;

module.exports = handler;

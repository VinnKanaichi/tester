
const threshold = 0.72; 

let handler = (m) => m;

handler.before = async function (m, { hanz, setReply }) {
  
  hanz.family = hanz.family || {};

  if (m.isGroup && m.chat in hanz.family) {
    const id = m.chat;
    const room = hanz.family[id];
    const textInput = m.text.toLowerCase().replace(/[^\w\s\-]+/, '');
    const isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);

   
    if (!isSurrender) {
      const index = room.jawaban.indexOf(textInput);

      if (index < 0) {
        
        const isAlmostCorrect = room.jawaban
          .filter((_, i) => !room.terjawab[i])
          .some((jawaban) => similarity(jawaban, textInput) >= threshold);

        if (isAlmostCorrect) {
          return setReply('Dikit lagi!');
        }
      }

      
      if (room.terjawab[index]) return;

     
      if (index >= 0) {
        global.db.data.users[m.sender].balance += room.winScore;
        room.terjawab[index] = m.sender;
      }
    }

    
    const isWin = room.terjawab.every((v) => v);

    
    let caption = Ehztext(`*GAME FAMILY100*

*Soal:* ${room.soal}

Terdapat ${room.jawaban.length} jawaban${room.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
${isWin ? `*SEMUA JAWABAN TERJAWAB ✅*` : isSurrender ? '*MENYERAH ❌*' : ''}
${Array.from(room.jawaban, (jawaban, index) => {
 return isSurrender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '✓ ' + room.terjawab[index].split('@')[0]  : ''}`.trim() : false
 }).filter(v => v).join('\n')}

${isSurrender ? '' : `+${room.winScore} Money tiap jawaban benar`}
     `).trim()

    
    hanz
      .sendMessage(
        m.chat,
        { text: caption, mentions: room.terjawab.filter(Boolean).map((v) => v + '@s.whatsapp.net') },
        { quoted: m }
      )
      .then((msg) => {
        hanz.family[id].msg = msg;
      })
      .catch(() => {});

  
    if (isWin || isSurrender) {
      delete hanz.family[id];
    }
  }
};

module.exports = handler;
 
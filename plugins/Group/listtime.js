//const _time = require("../../lib/grouptime.js");


const handler = async (m, { q, conn, isOwner, command, setReply }) => {
  const setTime = db.data.others["setTime"] || []; // Mengatur nilai default menjadi array kosong jika setTime tidak ada atau undefined.

  let teks = "\n\n––––––『 *List Group* 』––––––\n\n";
  for (let i of setTime) {
    teks += `• Group: ${i.name}
Open: ${i.timeOpen}
Close: ${i.timeClose}
\n`;
  }
  
  teks += `\n*Total ada : ${setTime.length}*`;
  teks += `\n\n📮 *Note:* ↓
• Setclose untuk mengatur waktu group di tutup
• Setopen untuk mengatur waktu group di buka
• Deltime untuk menonaktifkan open/close group
• Contoh setopen 21.00\n`;
  
  setReply(teks);
};

handler.tags = ["admin"];
handler.command = ["listtime"];
handler.group = true;
handler.admin = true;

module.exports = handler;

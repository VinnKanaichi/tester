let handler = async (m, { hanz, q, args, isOwner, setReply, text, command, usedPrefix }) => {
  const isAntiPorn = m.isGroup ? db.data.chats[m.chat].antiPorn : false;
  
  // Pastikan perintah dijalankan hanya di dalam grup
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isGroup) return setReply("Fitur ini hanya bisa diaktifkan di grup.");
  
  // Aktifkan fitur antiporn
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiPorn) return setReply("Fitur antiporn sudah aktif.");
    db.data.chats[m.chat].antiPorn = true;
    let ih = `Fitur antiporn telah diaktifkan.`;
    setReply(ih);
  
  // Nonaktifkan fitur antiporn
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiPorn) return setReply("Fitur antiporn sudah nonaktif.");
    db.data.chats[m.chat].antiPorn = false;
    let ih = `Fitur antiporn telah dimatikan.`;
    setReply(ih);
  
  // Jika tidak ada argumen yang jelas (on/off)
  } else if (!q) {
    setReply("Silakan pilih on atau off untuk mengaktifkan atau menonaktifkan fitur antiporn.");
  }
};

handler.help = ["antiporn"];
handler.tags = ["group"];
handler.command = ["antiporn"];
handler.group = true;
handler.admin = true;
module.exports = handler;
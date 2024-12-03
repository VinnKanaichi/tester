let handler = async (m, { hanz, q, setReply, isOwner, args, prefix, command }) => {
  if (!isOwner) return setReply("Perintah ini hanya untuk owner!");

  
  let leafType = db.data.settings["settingbot"].leafType;

  
  if (args[0] === 'thumbnail') {
    leafType = "thumbnail";
    setReply(`Berhasil mengubah tampilan leafType ke thumbnail.`);
  } else if (args[0] === 'document') {
    leafType = "document";
    setReply(`Berhasil mengubah tampilan leafType ke document.`);
  } else if (args[0] === 'audio') {
    leafType = "audio";
    setReply(`Berhasil mengubah tampilan leafType ke audio.`);
  } else if (args[0] === 'sticker') {
    leafType = "sticker";
    setReply(`Berhasil mengubah tampilan leafType ke sticker.`);
  } else if (!q) {
    setReply(`Silakan pilih salah satu:

┌  • thumbnail  
│  • document 
│  • audio  
└  • sticker 

Contoh: ${prefix + command} audio`);
  } else {
    setReply("Perintah tidak ditemukan.");
  }

 
 db.data.settings["settingbot"].leafType = leafType;

 
};

handler.help = ["setleaftype "];
handler.tags = ["owner"];
handler.command = ["setleaftype"];
handler.admin = true;

module.exports = handler;

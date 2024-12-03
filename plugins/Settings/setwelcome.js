let handler = async (m, { hanz, q, setReply, isOwner, args, prefix, command }) => {
  if (!isOwner) return setReply("Perintah ini hanya untuk owner!");

  
  let welcomeType = db.data.settings["settingbot"].welcomeType;

  
  if (args[0] === 'thumbnail') {
    welcomeType = "thumbnail";
    setReply(`Berhasil mengubah tampilan welcomeType ke thumbnail.`);
  } else if (args[0] === 'document') {
    welcomeType = "document";
    setReply(`Berhasil mengubah tampilan welcomeType ke document.`);
  } else if (args[0] === 'audio') {
    welcomeType = "audio";
    setReply(`Berhasil mengubah tampilan welcomeType ke audio.`);
  } else if (args[0] === 'sticker') {
    welcomeType = "sticker";
    setReply(`Berhasil mengubah tampilan welcomeType ke sticker.`);
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

 
 db.data.settings["settingbot"].welcomeType = welcomeType;

 
};

handler.help = ["setwelcome"];
handler.tags = ["owner"];
handler.command = ["setwelcome"];
handler.owner = true;

module.exports = handler;

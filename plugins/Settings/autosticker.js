let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off";
  const autoSticker = db.data.settings["settingbot"].autoSticker;
  if (q == "on") {
    if (autoSticker) throw "Sudah on";
    db.data.settings["settingbot"].autoSticker = true;
    setReply("Berhasil  mengaktifkan autosticker ");
  } else if (q == "off") {
    if (autoSticker) throw "Sudah off";
    db.data.settings["settingbot"].autoSticker = false;
    setReply("Berhasil  menonaktifkan autosticker");
  }
};

handler.command = ["autosticker"];
handler.owner = true;
module.exports = handler;
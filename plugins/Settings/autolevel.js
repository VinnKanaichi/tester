let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off";
  const autoLevel = db.data.settings["settingbot"].autoLevel;
  if (q == "on") {
    if (autoLevel) throw "Sudah on";
    db.data.settings["settingbot"].autoLevel = true;
    setReply("Berhasil  mengaktifkan autoLevel ");
             
  } else if (q == "off") {
    if (autoLevel) throw "Sudah off";
    db.data.settings["settingbot"].autoLevel = false;
    setReply("Berhasil  menonaktifkan autoLevel");
  }
};

handler.command = ["autolevel"];
handler.owner = true;
module.exports = handler;
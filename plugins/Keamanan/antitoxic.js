let handler = async (
  m,
  { hanz,q, args, isOwner, setReply, text, command, usedPrefix }
) => {
  const isAntiBadword = m.isGroup ? db.data.chats[m.chat].antibadword : false;
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiBadword) return setReply("Fitur sudah aktif kak");
    db.data.chats[m.chat].antibadword = true;
    let ih = `Fitur antiBadword/Toxic telah di aktifkan`;
    setReply(ih);
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiBadword) return setReply("Udah mati");
    db.data.chats[m.chat].antibadword = false;
    let ih = `Fitur antiBadword/Toxic telah di matikan`;
    setReply(ih);
  } else if (!q) {
    setReply("Pilih on atau off");
  }
};
handler.help = ["antilinkgc"];
handler.tags = ["group"];
handler.command = ["antibadword","antitoxic"];
handler.group = true;
handler.admin = true;
module.exports = handler;
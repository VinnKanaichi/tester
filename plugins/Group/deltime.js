const  { del } = require("../../lib/grouptime");


const handler = async (m, { q, hanz, isOwner, command, setReply }) => {
  const setTime = db.data.others["setTime"];

  if (!m.isGroup) return setReply(mess.only.group);

  del(m.from, setTime);
  setReply("Success");
};

handler.tags = ["admin"];
handler.command = ["deltime", "delltime"];
handler.group = true;
handler.admin = true;

module.exports = handler;

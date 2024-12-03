let handler = async (m, { hanz }) => {
  hanz.game = hanz.game ? hanz.game : {};
  let id = "siapakahaku-" + m.chat;
  if (!(id in hanz.game)) return;
  let json = hanz.game[id][1];
  let ans = json.jawaban;
  let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/gi, "_");
  m.reply(
    "Clue : " +
      "```" +
      clue +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_"
  );
};
handler.command = /^(who)$/i;
handler.limit = true;
module.exports = handler;
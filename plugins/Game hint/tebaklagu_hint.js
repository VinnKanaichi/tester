let handler = async (m, { hanz }) => {
  hanz.game = hanz.game ? hanz.game : {};
  let id = "tebaklagu-" + m.chat;
  if (!(id in hanz.game)) return;
  let json = hanz.game[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.judul.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_"
  );
};
handler.command = /^hlagu$/i;
handler.limit = true;
module.exports = handler;
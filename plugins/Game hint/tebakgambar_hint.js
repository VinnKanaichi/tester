let handler = async (m, { hanz }) => {
  hanz.game = hanz.game ? hanz.game : {};
  let id = "tebakgambar-" + m.chat;
  if (!(id in hanz.game)) throw false;
  let json = hanz.game[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_"
  );
};
handler.command = /^hgamb$/i;
handler.limit = true;
module.exports = handler;
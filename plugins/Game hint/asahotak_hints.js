let handler = async (m, { hanz }) => {
    hanz.game = hanz.game || {};
    let id = 'asahotak-' + m.chat;
    if (!(id in hanz.game)) throw false;
    let json = hanz.game[id][1];
    m.reply('Clue : ' + '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```' + '\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_');
};

handler.command = /^hotak$/i;
handler.limit = true;

module.exports = handler;

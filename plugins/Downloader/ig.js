

let handler = async (m, { command, q, hanz, prefix, setReply }) => {
  if (!q || !q.startsWith("https"))
    return setReply(
      `Linknya?\nContoh: ${prefix + command} https://www.instagram.com/p/CKXZ1Z1JZK/`
    );

  setReply(mess.wait);
  try {
 const { ndown } = require("nayan-media-downloader")
    let res = await ndown(q);
    let result = res.data;

    for (let i of result) {
      if (i.url.startsWith('https://d.rapidcdn.app')) {
        let url = i.url;
        hanz.sendMessage(m.chat, { video: { url } }, { quoted: m });
      } else if (i.url.startsWith('https://scontent.cdninstagram.com')) {
        let url = i.url;
        hanz.sendMessage(m.chat, { image: { url } }, { quoted: m });
      }
    }
  } catch (err) {
    console.error(err);
    setReply("Terjadi kesalahan saat mengambil data.");
  }
};

handler.help = ["instagram"];
handler.tags = ["downloader"];
handler.limit = true 
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

module.exports = handler;
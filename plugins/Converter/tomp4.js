const fetch = require("node-fetch");
const FormData = require("form-data");
const { JSDOM } = require("jsdom");

const handler = async (m, { hanz, command,sendReact }) => {
  const isQuotedSticker = m.quoted && m.quoted.mtype === 'stickerMessage';
const quoted = m.quoted ? m.quoted : m
  if (!isQuotedSticker) {
    return m.reply('Reply stickernya');
  }

  try {
    let media = await await quoted.download()
    let webpToMp4 = await webp2mp4(media);

    if (!webpToMp4) {
      return m.reply("Gagal mengonversi stiker/video menjadi video MP4.");
    }

    await hanz.sendMessage(
      m.chat,
      { video: { url: webpToMp4 }, caption: "Convert Webp to MP4 berhasil!" },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
    sendReact("❌");
  }
};

handler.help = ["tomp4"];
handler.command = ["tomp4"];
handler.tags = ["convert"];
handler.premium = false;
handler.group = true;

module.exports = handler;

async function webp2mp4(source) {
  let form = new FormData();
  let isUrl = typeof source === "string" && /https?:\/\//.test(source);
  form.append("new-image-url", isUrl ? source : "");
  form.append("new-image", isUrl ? "" : source, "image.webp");

  let res = await fetch("https://ezgif.com/webp-to-mp4", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error(`Gagal mengakses ezgif: ${res.statusText}`);
  }

  let html = await res.text();
  let { document } = new JSDOM(html).window;
  let form2 = new FormData();
  let obj = {};

  for (let input of document.querySelectorAll("form input[name]")) {
    obj[input.name] = input.value;
    form2.append(input.name, input.value);
  }

  let res2 = await fetch("https://ezgif.com/webp-to-mp4/" + obj.file, {
    method: "POST",
    body: form2,
  });

  if (!res2.ok) {
    throw new Error(`Gagal memproses konversi: ${res2.statusText}`);
  }

  let html2 = await res2.text();
  let { document: document2 } = new JSDOM(html2).window;

  let videoSrc = document2.querySelector("div#output > p.outfile > video > source");
  if (!videoSrc) {
    throw new Error("Tidak dapat menemukan URL video yang dihasilkan.");
  }

  return new URL(videoSrc.src, res2.url).toString();
}

const fs = require("fs");
const path = require("path");
const { FileUgu } = require("../../lib/uploader");

let handler = async (m, { command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (/image|video|audio/.test(mime) && command === "fileugu") {
    await m.reply("Processing...");
    try {
      // Unduh media sebagai buffer
      let media = await q.download();
      if (!media) throw "Failed to download media.";

      // Simpan buffer ke file sementara
      const tempFilePath = path.join(__dirname, "temp_media");
      fs.writeFileSync(tempFilePath, media);

      // Kirim path file sementara ke fungsi FileUgu
      let ous = await FileUgu(tempFilePath);
      let output = Object.entries(ous.files[0])
        .map(
          ([key, value]) =>
            `  ○ *${key.toUpperCase()}:* ${
              key === "size" ? formatBytes(value) : value
            }`
        )
        .join("\n");

      // Kirim output ke pengguna
      await m.reply(output);

      // Hapus file sementara
      fs.unlinkSync(tempFilePath);
    } catch (error) {
      console.error(error);
      m.reply("Terjadi kesalahan saat memproses media.");
    }
  } else {
    m.reply("Reply to an image, video, or audio file.");
  }
};

handler.help = ["fileugu"];
handler.tags = ["uploader"];
handler.command = ["fileugu"];

module.exports = handler;

function formatBytes(bytes) {
  if (bytes === 0) {
    return "0 B";
  }
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

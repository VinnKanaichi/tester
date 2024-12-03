const fs = require("fs");
const fse = require("fs-extra");

let handler = async (m, { hanz, q,setReply }) => {
  // Membaca data video yang ada
  const videonya = JSON.parse(fs.readFileSync('./json/video.json'));

  // Periksa izin
  if (!m.key.fromMe && !m.isOwner) return setReply("Hanya pemilik yang dapat menggunakan perintah ini.");

    const isQuotedVideo = m.quoted && m.quoted.mtype === 'videoMessage'; 
const isVideo = m.mtype === 'videoMessage'; 

  const quoted = m.quoted ? m.quoted : m
  if (!isQuotedVideo) return setReply("Reply video yang ingin ditambahkan.");
  if (!q) return setReply("Nama video-nya apa?");

  try {
    // Unduh video dan simpan
    let downloadedVideo = await hanz.downloadAndSaveMediaMessage(quoted);
    videonya.push(q);
    await fse.copy(downloadedVideo, `./temp/video/${q}.mp4`);

    // Update file JSON
    fs.writeFileSync('./json/video.json', JSON.stringify(videonya, null, 2));

    // Hapus file video yang diunduh sementara
    fs.unlinkSync(downloadedVideo);

    setReply(`Sukses menambahkan video dengan nama *${q}*`);
  } catch (error) {
    console.error(error);
    setReply("Terjadi kesalahan saat menambahkan video.");
  }
};

handler.command = ["addvideo"];
handler.owner = true;

module.exports = handler;

const fetch = require('node-fetch');

let handler = async (m, { hanz, q, setReply, args, prefix, command }) => {
  // Validasi input argumen
  if (!args[0]) {
    return setReply(
      `📖 *Contoh penggunaan:*\n\n${
        prefix + command
      } 1 2\n\n📌 *Penjelasan:*\nMenampilkan surah Al-Fatihah ayat 2 beserta audionya, dengan jumlah ayat yang ditampilkan sebanyak 1.`
    );
  }
  if (!args[1]) {
    return setReply(
      `📖 *Contoh penggunaan:*\n\n${
        prefix + command
      } 1 2\n\n📌 *Penjelasan:*\nMenampilkan surah Al-Fatihah ayat 2 beserta audionya, dengan jumlah ayat yang ditampilkan sebanyak 1.`
    );
  }

  let surah = q.split(" ")[0]; // Ambil nomor surah
  let ayat = q.split(" ")[1]; // Ambil nomor ayat

  try {
    // Mengambil data dari API
    let json = await fetch(`https://api.quran.gading.dev/surah/${surah}/${ayat}`);
    let result = await json.json();
    let url = result.data.audio.primary; // URL audio dari API

    // Format pesan teks yang lebih menarik
    let text = `
✨ *Al-Quran Digital* ✨

📖 *Surah:* ${result.data.surah.name.short} (${result.data.surah.name.translation.id})
📜 *Surat ke-* ${result.data.surah.number}
📆 *Juz:* ${result.data.meta.juz}
📚 *Total ayat:* ${result.data.surah.numberOfVerses}
🔢 *Ayat ke-* ${result.data.number.inSurah}

🕋 *Isi Ayat (Arab):*
${result.data.text.arab}

🔤 *Latin (Transliterasi):*
${result.data.text.transliteration.en}

🌍 *Arti (Bahasa Indonesia):*
${result.data.translation.id}

📝 *Arti (Bahasa Inggris):*
${result.data.translation.en}

📘 *Tafsir Surah (Indonesia):*
${result.data.tafsir.id.long}

🎧 *Audio:* Segera diputar...

`;

    // Kirim pesan teks dengan hasil
    await hanz.reply(m.chat, text, m);

    // Kirim audio Al-Quran
    await hanz.sendMessage(
      m.chat,
      { mimetype: "audio/mp4", audio: { url } }, // Kirim audio dari URL yang diambil
      { quoted: m }
    );

  } catch (error) {
    console.error("Error fetching Quran data:", error);
    setReply("⚠️ Maaf, terjadi kesalahan saat memproses permintaan.");
  }
};

// Menambahkan bantuan, tags, dan perintah yang bisa digunakan
handler.help = ["murothal", "alquran"];
handler.tags = ["quotes"];
handler.command = ["alquran", "quran"];

module.exports = handler;

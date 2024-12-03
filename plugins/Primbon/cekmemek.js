const handler = async (m, { hanz, args, text, usedPrefix, command }) => {
  const gayDescriptions = [
    "*Udah Ga Perawan:v*\n• Warna Item🙈\n• Bulu Lebat\n• Katanya Polos Ko Lima Jari Lolos Chuackk",
    "*Masih Perawan*\n• Warna Pink🤤\n• Tidak Berbulu\n• Wah Yang ini Buat Owner Ku Aja😋",
    "*Bjir Bau 😵‍💫*\n\n• Kang Colmek\n• Sangat Lebat:v\n• Ishh Sarang Jin Itu😵",
    "*Masih Perawan*\n• Warna Putih Mati\n• Masih Polos\n• Sepertinya Anda Butuh Kehangatan Dari Owner ku🥸",
    "*Meki nya Semu Coklat*\n • Korban Pemerkosaan 😑\n• Lu Sih Main Ma Kumpulan Cowo Sengklek\n• Sebaiknya Jan Terlalu Gegabah 🤧",
    "*Normal Seperti Biasanya*\n• Wuanjay Ko Bulu Nya Pada Kriput🙈\n• Ternyata Oh Ternyata Kamu Suka Lesby🫤",
    "*Bahaya Noh Gan*\n• Udah Kena Virus\n• Kalo wik wik Ntar Ke Patil Cowoknya\n😶‍🌫️Takut BerNanah Kelamin Ku ntarr😬",
    "*Lah Ireng Amat bjirr*\n• Hati² Sama Ni Orang Beneran Dah\n• Jangankan Pria Hewan Pun Dia Layani🫣",
    "*74%*\n*Astagfirullah Kabur Gan🏃🌬️*"
  ];

  if (!text) return m.reply('Tag temanmu!');

  // Pilih deskripsi acak dari array
  const result = gayDescriptions[Math.floor(Math.random() * gayDescriptions.length)];

  // Kirim pesan dengan konten yang telah diformat
  hanz.sendMessage(m.chat, { 
    contextInfo: { 
      externalAdReply: { 
        showAdAttribution: false,
        title: `${week} , ${calender}ㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
        body: `⌜  ⌟`,
        previewType: "PHOTO",
        thumbnailUrl: `${getRandom(fotoRandom)}`, // Pastikan variabel 'thumb' sudah terdefinisi dengan benar
        sourceUrl: "https://www.instagram.com/ehanzdhoanx"
      }
    }, 
    text: `Hasil Dari: *${text}*\n\nJawaban : ${result}`
  }, { quoted: m });
};

handler.help = ["gaycheck"];
handler.tags = ["primbon"];
handler.command = ["gaycheck", "cekmemek"];

module.exports = handler;

let handler = async (m, { hanz, setReply, prefix, command, args}) => {
  try {
    // Mengecek apakah args ada atau tidak
    if (args.length == 0) return setReply(`Example: ${prefix + command} Teks`);

    setReply('Processing...'); // Menampilkan status pemrosesan

    let ini_txt = args.join(" "); // Menggabungkan argumen menjadi satu teks
    // Membuat URL untuk menghasilkan gambar dengan efek water-logo
    var buffer = `https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=${ini_txt}`;

    // Mengirim pesan dengan gambar hasil dari FlamingText
    await hanz.sendMessage(m.chat, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `${botName}`,
          mediaType: 3,
          renderLargerThumbnail: false,
          thumbnailUrl: `${getRandom(fotoRandom)}`,  
          sourceUrl: `https://wa.me/${nomerOwner}`,
        }
      },
      image: { url: buffer },
      caption: 'Here is your custom water logo!',
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    setReply('Server sedang error, coba lagi besok!');
  }
};

handler.help = ['customwaterlogo'];
handler.command = ['customwaterlogo'];
handler.tags = ['textpro'];
handler.premium = false;  // Menambahkan status premium jika diperlukan
handler.group = true;    

module.exports = handler;

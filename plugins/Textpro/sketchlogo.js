let handler = async (m, { hanz, setReply, prefix, command,args}) => {
  try {
    // Mengecek apakah args ada atau tidak
    if (args.length == 0) return setReply(`Example: ${prefix + command} Teks`);

    setReply('Processing...'); // Menampilkan status pemrosesan

    let ini_txt = args.join(" "); // 
    var buffer = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=${ini_txt}`;

    // Mengirim pesan dengan gambar hasil dari FlamingText
    await hanz.sendMessage(m.chat, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `${botName}`,
          mediaType: 3,
          renderLargerThumbnail: false,
          thumbnail: `${getRandom(fotoRandom)}`,
          sourceUrl: `https://wa.me/${nomerOwner}`,
        }
      },
      image: { url: buffer },
      caption: 'Here is your sketch name logo!',
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    setReply('Server sedang error, coba lagi besok!');
  }
};

handler.help = ['sketchlogo'];
handler.command = ['sketchlogo'];
handler.tags = ['textpro'];
handler.premium = false;  
handler.group = true
module.exports = handler;




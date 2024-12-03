const axios = require('axios'); // Pastikan axios sudah terinstall dan di-require

let handler = async (m, { hanz, text, q, usedPrefix, command,setReply }) => {
  if (!q) return setReply(mess.query); // Jika tidak ada query, kembalikan pesan "query belum diberikan"

  await setReply(mess.wait); // Menunggu proses selesai, pastikan mess.wait sudah terdefinisi

  const { downloadContentFromMessage, generateWAMessageFromContent, proto, generateWAMessageContent } = require("baileys");

  // Fungsi untuk membuat pesan gambar
  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: {
        url
      }
    }, {
      upload: hanz.waUploadToServer // Asumsikan 'conn' adalah objek yang sudah didefinisikan
    });
    return imageMessage;
  }

  // Fungsi untuk mengacak array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let push = [];
  let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${q}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${q}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);

  let res = data.resource_response.data.results.map(v => v.images.orig.url); // Mengambil URL gambar

  shuffleArray(res); // Mengacak array gambar

  let ult = res.splice(0, 5); // Mengambil 5 gambar pertama dari array yang sudah diacak
  let i = 1;

  for (let pus of ult) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `Image ke - ${i++}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: wm // Asumsikan wm adalah string atau variabel yang sudah didefinisikan
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: 'Hasil.',
        hasMediaAttachment: true,
        imageMessage: await createImage(pus) // Menggunakan fungsi createImage untuk menambahkan gambar
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: `{"display_text":"url","Klik disini":"${pus}","merchant_url":"${pus}"}`
          }
        ]
      })
    });
  }

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: 'Hai\nDibawah ini Adalah hasil dari Pencarian Kamu'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: global.botName // Pastikan global.botName sudah didefinisikan
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: push // Mengirimkan array 'push' yang berisi gambar-gambar
          })
        })
      }
    }
  }, {});

  await hanz.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  });

};

handler.help = ['ngl']; // Menentukan command yang digunakan
handler.tags = ['tools']; // Menambahkan kategori
handler.command = ['pin','pinterest'] // Menentukan regex untuk mencocokkan command

module.exports = handler;

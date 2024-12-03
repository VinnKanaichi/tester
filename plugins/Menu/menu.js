const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const { generateWAMessageFromContent,prepareWAMessageMedia, proto } = require("baileys");

let handler = async (m, { hanz, q, isOwner, setReply,sendvn,dmusic,onlyToko }) => {
  // Path ke folder plugins
  const pluginsFolderPath = "./plugins";
  
  // Daftar folder yang ingin dikecualikan berdasarkan role (Owner / User)
  let forOwner = ['Bot-function', 'Game-answer', 'Game-hint','Case']
  let forUser = ['Bot-function', 'Game-answer','Game-hint','Owner','Case']
  const excludedFolders = isOwner ? forOwner : forUser; // Menentukan folder yang dikecualikan berdasarkan role
  
  // Jika query kosong, tampilkan informasi menu
  if (!q) {
    function toMonospace(text) {
      return `${text}`;
    }

    // Waktu di zona WIB
    const timeWib = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    moment.tz.setDefault("Asia/Jakarta").locale("id");

    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001); // Pembatas untuk membaca lebih lanjut

    let dt = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
    const ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);

    let dot = new Date(new Date() + 3600000);
    const dateIslamic = Intl.DateTimeFormat("id-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dot);
// TAHUN BARU
let sekarang = moment().tz('Asia/Jakarta');
let tahunDepan = sekarang.year() + 1;
let tahunBaru = moment.tz(`${tahunDepan}-01-01 00:00:00`, 'Asia/Jakarta');
let selisih = moment.duration(tahunBaru.diff(sekarang));
let hari = Math.floor(selisih.asDays());
let jam = selisih.hours();
let menit = selisih.minutes();
let detik = selisih.seconds();
let ucapanTahunBaru = `Menuju tahun baru: ${hari} hari, ${jam} jam, ${menit} menit, dan ${detik} detik lagi.`;

    const data = global.db.data.others["newinfo"];
    const info = data ? data.info : "";
    const block = await hanz.fetchBlocklist();
    const timeInfo = data ? clockString(new Date() - data.lastinfo) : "tidak ada";
const publik = `${global.public}`
    // Fungsi untuk menghitung jumlah file .js dalam sebuah folder
    function countJSFiles(folderPath) {
      try {
        const files = fs.readdirSync(folderPath); // Baca isi folder secara sinkron
        let jsFileCount = 0;

        files.forEach((file) => {
          const filePath = path.join(folderPath, file);
          const stat = fs.statSync(filePath); // Dapatkan status file

          if (stat.isDirectory()) {
            if (!excludedFolders.includes(file)) {
              jsFileCount += countJSFiles(filePath); // Rekursif ke folder dalam folder
            }
          } else {
            if (path.extname(file) === ".js") {
              jsFileCount++; // Tambah 1 jika file berformat .js
            }
          }
        });

        return jsFileCount;
      } catch (error) {
        console.error("Error:", error);
        return 0; // Jika error, kembalikan nilai 0
      }
    }

    // Hitung jumlah file .js dalam folder plugins
    const totalJSFiles = countJSFiles(pluginsFolderPath);

    // Hitung jumlah case yang ada di file case.js
    const totalCase = () => {
      try {
        const mytext = fs.readFileSync("./message/case.js", "utf8");
        const numCases = (mytext.match(/(?<!\/\/)(case\s+['"][^'"]+['"])/g) || [])
          .length;
        return numCases;
      } catch (err) {
        console.error("Error:", err);
        return 0;
      }
    };

            

 
    // Menu yang ditampilkan kepada pengguna
    const menu = Ehztext(`
 ${gris}「 Info Bot 」${gris}
» Nama : ${m.pushname}
» Tipe Bot : Case & Plugins 
» Bot Mode* : ${publik ? "🌍 Public" : "🤖 Self"}
» Library : ${baileysVersion}
» Features: ${totalJSFiles + totalCase()}
» Users:  👥  ${Object.keys(db.data.users).length}
» Banned: ${db.data.banned.length}
» Total Error* : ❌ ${db.data.listerror.length}
» Blocked : 🚫 ${block.length}
» Cmd Blocked : ⛔ ${db.data.blockcmd.length}

 ${gris}「 WARNING 」${gris} 
» 🅟 : Premium 
» 🅛 : Limit
» 🅔 : Error
» 🅑 : Blocked
     
 ${gris}「 Date & Time 」${gris} 
» ${week}, ${calender}
» ${toMonospace(dateIslamic)}
» ${timeWib} WIB
» ${ucapanTahunBaru}
${readmore}
╭──┈  ${gris}「 LIST MENU 」${gris} 
│ ◦ ${toMonospace('.allmenu')}
│ ◦ ${toMonospace('.menu ai')}
│ ◦ ${toMonospace('.menu anime')}
│ ◦ ${toMonospace('.menu anonymous')}
│ ◦ ${toMonospace('.menu converter')}
│ ◦ ${toMonospace('.menu downloader')}
│ ◦ ${toMonospace('.menu ephoto')}
│ ◦ ${toMonospace('.menu fun')}
│ ◦ ${toMonospace('.menu game')}
│ ◦ ${toMonospace('.menu group')}
│ ◦ ${toMonospace('.menu info')}
│ ◦ ${toMonospace('.menu islamic')}
│ ◦ ${toMonospace('.menu nsfw')}
│ ◦ ${toMonospace('.menu owner')}
│ ◦ ${toMonospace('.menu panel')}
│ ◦ ${toMonospace('.menu primbon')}
│ ◦ ${toMonospace('.menu quotes')}
│ ◦ ${toMonospace('.menu rpg')}
│ ◦ ${toMonospace('.menu search')}
│ ◦ ${toMonospace('.menu shorturl')}
│ ◦ ${toMonospace('.menu textpro')}
│ ◦ ${toMonospace('.menu tools')}
│ ◦ ${toMonospace('.menu uploader')}
╰───···
`);
function displayFilesByFolderAll(folderPath, excludedFolders = [], premium = [], limit = [], error = [], bloked = [], isLast = false) {
    let result = ''; // Inisialisasi string kosong

    const filesAll = fs.readdirSync(folderPath);
    filesAll.forEach((file, index) => {
        const filePathAll = path.join(folderPath, file);
        const statAll = fs.statSync(filePathAll);
        const isDirectoryAll = statAll.isDirectory();
        const folderNameAll = isDirectoryAll ? path.basename(filePathAll) : '';
        const fileNameWithoutExtensionAll = isDirectoryAll ? '' : path.parse(file).name;
        const isLastFileAll = index === filesAll.length - 1 && !isDirectoryAll && isLast;

        if (isDirectoryAll && !excludedFolders.includes(folderNameAll)) {
            result += `▧──···「 *${Ehztext(folderNameAll)}* 」\n`; // Tambahkan nama folder ke string result
            const isSubLast = index === filesAll.length - 1 && isLast;
            result += displayFilesByFolderAll(filePathAll, excludedFolders, premium, limit, error, bloked, isSubLast); // Rekursif untuk folder dalam folder
        } else if (!isDirectoryAll) {
            let marker = '';
            if (premium.includes(fileNameWithoutExtensionAll)) {
                marker += '  🅟';
            }
            if (limit.includes(fileNameWithoutExtensionAll)) {
                marker += '  🅛';
            }
            if (error.includes(fileNameWithoutExtensionAll)) {
                marker += '  🅔';
            }
            if (bloked.includes(fileNameWithoutExtensionAll)) {
                marker += '  🅑'; // Tambahkan tanda 🅑 jika file ada dalam blokedFiles
            }
            const transformedFileNameAll = Ehztext(fileNameWithoutExtensionAll); // Transformasikan nama file
            result += `• ${transformedFileNameAll}${marker}\n`; // Tambahkan nama file ke string result

            if (isLastFileAll) {
                result += '\n'; 
            }
        }
    });

    if (!isLast && !result.endsWith('☉\n')) {
        result += '\n\n'; 
    }

    return result; 
}


const premiumFilesAll = db.data.data.filter(item => item.name === 'premium')[0].id;
const limitFilesAll = db.data.data.filter(item => item.name === 'limit')[0].id;
const errorFilesAll = db.data.listerror.map(item => item.cmd);
const blokedFilesAll = db.data.blockcmd.map(item => item.cmd);

const outputStringAll = displayFilesByFolderAll(pluginsFolderPath, excludedFolders, premiumFilesAll, limitFilesAll, errorFilesAll, blokedFilesAll, true);
const menuAll = `
📊 *Stats :*
┌  ◦ Running on: ${runWith}
│  ◦ Hits Today: ${
    thisHit == undefined
      ? "0"
      : thisHit.toLocaleString() == undefined
      ? "0"
      : thisHit.toLocaleString()
  }
│  ◦ Features: ${totalJSFiles+totalCase()}
│  ◦ Errors: ${db.data.listerror.length} 
│  ◦ Users: ${Object.keys(db.data.users).length}
│  ◦ Banned: ${db.data.banned.length} 
│  ◦ Blocked: ${block.length}
│  ◦ Premium: ${Object.values(db.data.users).filter((u) => u.premiumTime !== 0).length}
└  ◦ Blocked Commands: ${db.data.blockcmd.length} 

🕒 *Date & Time :* 
┌  ◦ ${week}, ${calender} 
│  ◦ ${timeWib} WIB
│  ◦ ${dateIslamic}
└  ◦ ${ucapanTahunBaru}

⚠ *Warning :*
┌  ◦ 🅟 : Premium
│  ◦ 🅛 : Limit
│  ◦ 🅔 : Error
└  ◦ 🅑 : Blocked

🆕 *Latest Update :*
┌ ◦ ${info}
╰ ◦ di update ${timeInfo} yang lalu

]––––––『 *Commands* 』––––––[\n\n`
   // Fungsi untuk menampilkan semua nama file tanpa ekstensi dalam sebuah folder
  function displayFilesByFolder(folderPath, excludedFolders = []) {
    let result = []; // Inisialisasi string kosong

    const files = fs.readdirSync(folderPath);
    files.forEach((file, index) => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
      const isDirectory = stat.isDirectory();
      const folderName = isDirectory ? path.basename(filePath) : "";

      if (isDirectory && !excludedFolders.includes(folderName)) {
        result.push(folderName);
      }
    });

    return result; // JSON.stringify([result]); ; // Kembalikan string result setelah semua proses selesai
  }

  // Memanggil fungsi untuk menampilkan nama file tanpa ekstensi berdasarkan folder
  const outputString = displayFilesByFolder(pluginsFolderPath, excludedFolders);
var setmenu = db.data.settings['settingbot'].setmenu

if (setmenu === "livelocation") {
hanz.relayMessage(m.chat, { liveLocationMessage: { 
degreesLatitude: 35.676570,
degreesLongitude: 139.762148,
caption :transformText(menuAll) + readmore + outputStringAll,
sequenceNumber: 1656662972682001, timeOffset: 8600, 
jpegThumbnail: null,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
containsAutoReply: true,
showAdAttribution: true,
}
}
}
}, {quoted: m})
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu == "payment"){
let numb = ["7.76","15.48","8.92","10.72","13.48","4.39","5.99","2.56"]
let amont = numb[Math.floor(Math.random() * numb.length)]
hanz.relayMessage(m.chat,  {
requestPaymentMessage : {
expiryTimestamp: 0,												
currencyCodeIso4217: 'USD',
amount1000: (amont) * 1000,
requestFrom: `${m.sender.split('@')[0]}@s.whatsapp.net`,
noteMessage: {
extendedTextMessage: {
text : transformText(menuAll) + readmore + outputStringAll,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
}
}
}
}
}
}, {})
await sleep(1500) 
sendvn(dmusic)
 } else if (setmenu == "image"){
hanz.sendMessage(m.chat, { contextInfo: { externalAdReply: { showAdAttribution: true,
title: `${botName}`,
body:`${baileysVersion}`,
previewType:"PHOTO", 
thumbnailUrl: 'https://pomf2.lain.la/f/nyyr3gb7.jpg',
sourceUrl:`${web}`
}}, image: fs.readFileSync('./stik/thumb.jpeg'), caption: transformText(menuAll) + readmore + outputStringAll},
{ quoted: m })
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu == "toko"){
return onlyToko()
 } else if (setmenu == "thumbnail"){
hanz.sendMessage(m.chat, { contextInfo: {
            externalAdReply: {
                showAdAttribution: true, 
                title: `${botName}`,
                body: `Runtime ${runTime}`,
                mediaType: 1,  
                renderLargerThumbnail: true,
                thumbnailUrl:'https://pomf2.lain.la/f/nyyr3gb7.jpg',
                sourceUrl: `${web}`
            },
            editKey: { 
                remoteJid: m.sender, 
                id: 'some_unique_message_id'  
            }
        },
        text: transformText(menuAll) + readmore + outputStringAll
    }, { quoted: m });
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu == "gif"){
hanz.sendMessage(m.chat, { video: fs.readFileSync('./stik/video.mp4'),
gifPlayback: true,
caption: transformText(menuAll) + readmore + outputStringAll,
 contextInfo: {
 externalAdReply: {
containsAutoReply: true,
mediaType: 1,

renderLargerThumbnail: true,
showAdAttribution: true,
sourceUrl: "https://instagram.com/p.u.t8",
thumbnailUrl: 'https://pomf2.lain.la/f/nyyr3gb7.jpg',
title:wm,
body: `${ucapanWaktu} kak ${m.pushname}`,},},}, { quoted: m }); 
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu == "katalog"){
 const { generateWAMessageFromContent } = require("baileys")
let prep = generateWAMessageFromContent(m.chat, { orderMessage: { 
itemCount: `90000`, status: 500,
surface: 999,
message: transformText(menuAll) + readmore + outputStringAll,
description: '^^',
orderTitle: 'ʙᴇᴊɪʀ ᴅᴇᴋ',
token: '120363212768920223@g.us',
mediaType: 1,
curreyCode: 'IDR',
totalCurrencyCode: 'ʙᴇᴊɪʀ ᴅᴇᴋ',
totalAmount1000: '50000',
sellerJid: '6281316643491@s.whatsapp.net',
thumbnail: fs.readFileSync('./stik/rangel.jpg'), 
//thumbnaiUrl: pickRandom(fotoRandom)
}}, {contextInfo:{ externalAdReply: {
showAdAttribution: true, 
title: `${week} , ${calender}`,
body: `${botName}`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl:getRandom(fotoRandom),
sourceUrl: `${web}`}},quoted: m})
hanz.relayWAMessage(prep)
await sleep(1500) 
sendvn(dmusic)
    } else if (setmenu == "document"){
hanz.sendMessage(m.chat, {
document: fs.readFileSync("./package.json"),
fileName: wm,
mimetype: "application/vnd.ms-powerpoint",
jpegThumbnail:fs.readFileSync("./stik/menhera.jpg"),
caption: transformText(menuAll) + readmore + outputStringAll,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: botName,
body: `Hai  ${ucapanWaktu} kak ${m.pushname}` ,
thumbnail: fs.readFileSync('./stik/thumb.jpeg'),
thumbnailUrl: 'https://pomf2.lain.la/f/nyyr3gb7.jpg',
sourceUrl: web,
mediaType: 1,
renderLargerThumbnail: true 
}}}, { quoted: m,ephemeralExpiration: 86400});
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu === "docImage") {
let msg = generateWAMessageFromContent(
  m.chat,
  {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid,
              newsletterName,
              serverMessageId: 145
            },
            businessMessageForwardInfo: {
              businessOwnerJid: hanz.user.id
            },
            externalAdReply: {
              title: `${ucapanWaktu} kak ${m.pushname}`,
              body: `Runtime ${runTime}`,
              thumbnailUrl: 'https://pomf2.lain.la/f/nyyr3gb7.jpg',
              sourceUrl: web,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          },
          body: proto.Message.InteractiveMessage.Body.create({
            text: menu,
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "ᴊᴇᴅᴀ ʙᴏᴛ ᴊɪᴋᴀ ᴛɪᴅᴀᴋ ᴍᴇʀᴇꜱᴩᴏɴ",
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: ``,
            thumbnailUrl: "",
            gifPlayback: true,
            subtitle: "",
            hasMediaAttachment: true,
            ...(await prepareWAMessageMedia({
              document: fs.readFileSync('./stik/rangel.jpg'),
              mimetype: "image/png",
              fileLength: 99999999999999,
              jpegThumbnail: fs.readFileSync('./stik/rangel.jpg'),
              fileName: `${m.pushname}`,
            }, {
              upload: hanz.waUploadToServer
            }))
          }),
          gifPlayback: true,
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [] // No buttons needed
          })
        }),
      }
    }
  },
  { quoted: m }
);


    await hanz.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });
    await sleep(1500)
      sendvn(dmusic)
    }
  } else {

// Fungsi untuk menampilkan semua nama file tanpa ekstensi dalam sebuah folder
function displayFilesByFolder(folderPath, excludedFolders = [], premium = [], limit = [], error = [], bloked = [], isLast = false) {
  let result = '';  // Ganti link ini dengan link audio Anda
    // Inisialisasi string kosong

  const files = fs.readdirSync(folderPath);
  files.forEach((file, index) => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
      const isDirectory = stat.isDirectory();
      const folderName = isDirectory ? path.basename(filePath) : '';
      const fileNameWithoutExtension = isDirectory ? '' : path.parse(file).name;
      const isLastFile = index === files.length - 1 && !isDirectory && isLast;
      //log(folderName)
      //log(q)
      
      if (isDirectory && folderName.toLowerCase() == q) { //!excludedFolders.includes(folderName)
        
      
          result += `╭─┈ ${gris}▣ ${folderName} ▣${gris}┈────⊡\n`; // Tambahkan nama folder ke string result
          const isSubLast = index === files.length - 1 && isLast;
          result += displayFilesByFolder(filePath, excludedFolders, premium, limit, error, bloked, isSubLast); // Rekursif untuk folder dalam folder
      } else if (!isDirectory) {
          let marker = '';
          if (premium.includes(fileNameWithoutExtension)) {
              marker += ' 🅟';
          }
          if (limit.includes(fileNameWithoutExtension)) {
              marker += ' 🅛';
          }
          if (error.includes(fileNameWithoutExtension)) {
              marker += ' 🅔';
          }
          if (bloked.includes(fileNameWithoutExtension)) {
              marker += ' 🅑'; // Tambahkan tanda jika file ada dalam blokedFiles
          }
          let Twkns = Ehztext(fileNameWithoutExtension);
          const transformedFileName = `╰◈ .${Twkns}`; // Transformasikan nama file
          result += `${transformedFileName}${marker}\n`; // Tambahkan nama file ke string result

          if (isLastFile) {
              result += '\n'; // Tambahkan penanda akhir folder
          }
      }
  });

  if (!isLast && !result.endsWith('\n')) {
      result += '\n\n'; // Tambahkan penanda akhir folder jika bukan folder terakhir
  }

  return result; // Kembalikan string result setelah semua proses selesai
}


const premiumFiles = db.data.data.filter(item => item.name === 'premium')[0].id;
const limitFiles = db.data.data.filter(item => item.name === 'limit')[0].id;
const errorFiles = db.data.listerror.map(item => item.cmd);
const blokedFiles = db.data.blockcmd.map(item => item.cmd);

// Memanggil fungsi untuk menampilkan nama file tanpa ekstensi berdasarkan folder
const outputString = displayFilesByFolder(pluginsFolderPath, excludedFolders, premiumFiles, limitFiles, errorFiles, blokedFiles, true);

let links = [
  "https://pomf2.lain.la/f/nyyr3gb7.jpg",
  ];
  
  const contextInfo = {
  forwardingScore: 1,
  isForwarded: true,
  containsAutoReply: true,
  mentionedJid: [m.sender],
  forwardedNewsletterMessageInfo: {
  newsletterJid,
  serverMessageId: 100,
  newsletterName,
  },
  businessMessageForwardInfo: {
  businessOwnerJid: m.botNumber,
  },
  externalAdReply: {
  title: `${botName}`,
  body:``,
  mediaType: 1,
  renderLargerThumbnail: true,
  thumbnailUrl: links.getRandom(),
  //jpegThumbnail: fs.readFileSync('./media/thumb2.jpg'),
  thumbnail: fs.readFileSync('./stik/thumb.jpeg'),
  sourceUrl: global.sig, 
  mediaUrl: global.syt,
  },
  };
  
  hanz.sendMessage(m.chat,{ contextInfo, mentions: [m.sender], text: outputString});

}

};

handler.help = ["all"];
handler.tags = ["internet"];
handler.command = ["menu","helpmen"];
module.exports = handler;

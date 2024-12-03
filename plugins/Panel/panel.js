const { generateWAMessageFromContent, prepareWAMessageMedia,proto } = require("baileys")

let handler = async (m, { hanz, text, usedPrefix, pushname,command,setReply,isResPanel }) => {
//if (!isResPanel) return setReply(mess.resPanel)
let t = text.split(',');
if (t.length < 2) return setReply(`Example: ${usedPrefix + command} user,nomer\n
Contoh: .panel rangel,6285795718659`)
let username2 = t[0];
let u2 = t[1];

let sections = [{
title: 'List Disk dan Cpu Panel',
rows: [{
title: 'Unli',
description: `Unlimited Ram/Cpu`, 
id: `.unli ${username2},${u2}`
},
{
title: '1Gb', 
description: "1Gb Ram/50 Cpu", 
id: `.1gb ${username2},${u2}`
},
{
title: '2Gb', 
description: "2Gb Ram/70 Cpu", 
id: `.2gb ${username2},${u2}`
},
{
title: '3Gb', 
description: "3Gb Ram/100 Cpu", 
id: `.3gb ${username2},${u2}`
},
{
title: '4Gb', 
description: "4Gb Ram/125 Cpu", 
id: `.4gb ${username2},${u2}`
},
{
title: '5Gb', 
description: "5Gb Ram/150 Cpu", 
id: `.5gb ${username2},${u2}`
},
{
title: '6Gb', 
description: "6Gb Ram/175 Cpu", 
id: `.6gb ${username2},${u2}`
},
{
title: '7Gb', 
description: "7Gb Ram/175 Cpu", 
id: `.7gb ${username2},${u2}`
},
{
title: '8Gb', 
description: "8Gb Ram/200 Cpu", 
id: `.8gb ${username2},${u2}`
}]
}]

let listMessage = {
    title: 'Click For List', 
    sections
};

let msghhhhhhh = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: {
 "messageContextInfo": {
 "deviceListMetadata": {},
 "deviceListMetadataVersion": 2
 },
 interactiveMessage: proto.Message.InteractiveMessage.create({
 contextInfo: {
 mentionedJid: [m.sender], 
 isForwarded: false, 
 forwardedNewsletterMessageInfo: {
 newsletterJid,
 newsletterName,
 serverMessageId: -1
},
 businessMessageForwardInfo: { businessOwnerJid: hanz.decodeJid(hanz.user.id) },
 }, 
 body: proto.Message.InteractiveMessage.Body.create({
 text: `> _Berikut Adalah List Untuk Disk Panel_`
 }),
 footer: proto.Message.InteractiveMessage.Footer.create({
 text: ``
 }),
 header: proto.Message.InteractiveMessage.Header.create({
 title: `*${gris}[ Hallo Kak ${m.pushname} ]${gris}*`,
 subtitle: "Create",
 hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: "https://pomf2.lain.la/f/cleee3o1.jpg" } }, { upload: hanz.waUploadToServer }))
 }),
 nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
 buttons: [ 
 {
 "name": "single_select",
"buttonParamsJson": JSON.stringify(listMessage)
 },
 ]
 })
 })
 }
 }
}, {})

await hanz.relayMessage(msghhhhhhh.key.remoteJid, msghhhhhhh.message, {
 messageId: msghhhhhhh.key.id
})}

handler.command = ['panel']
handler.help = ['panel'];
handler.tags = ['store'];
handler.selerpanel = true;

module.exports = handler;
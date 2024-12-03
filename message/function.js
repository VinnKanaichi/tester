// File: function.js
const fs = require('fs-extra');
const axios = require("axios");
const moment = require("moment-timezone");
const Jimp = require('jimp');

async function mainFunction(conn) {

  try {
    


let gempa = db.data.others['updateGempa']
let data1 = db.data.others['infogempa']
if(!gempa) db.data.others['updateGempa'] = []

if(gempa && gempa.length > 0){

setInterval(async() => {
const {data} = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")
let nana = /TimurLaut|Tenggara|BaratDaya|BaratLaut|Utara|Timur|Selatan|Barat/
//console.log(data.Infogempa)
let lokasi = data.Infogempa.gempa.Wilayah //.split("km")[1].replace(nana,"").replace(" ",'').replace(" ","")
let waktu = data.Infogempa.gempa.Jam
let caption = `*📢 INFO GEMPA TERKINI 📢*

📅 *Tanggal:* ${data.Infogempa.gempa.Tanggal}
⏰ *Waktu:* ${data.Infogempa.gempa.Jam}
📍 *Koordinat:* ${data.Infogempa.gempa.Coordinates}
💥 *Magnitudo:* ${data.Infogempa.gempa.Magnitude}
🌊 *Kedalaman:* ${data.Infogempa.gempa.Kedalaman}
📌 *Lokasi:* ${data.Infogempa.gempa.Wilayah}
⚠️ *Potensi:* ${data.Infogempa.gempa.Potensi}
📡 *Dirasakan di:* ${data.Infogempa.gempa.Dirasakan}

*Catatan:*
_Untuk menonaktifkan fitur pembaruan otomatis mengenai gempa, silakan ketik_ *.updategempa off*

🌍 *Tetap waspada dan jaga keselamatan diri!*`;


if(data1){
let getGroups = await conn.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)
let image = {url:"https://data.bmkg.go.id/DataMKG/TEWS/" + data.Infogempa.gempa.Shakemap}
  
if(data1.lokasi !== lokasi && data1.lokasi !== waktu){
 
data1.lokasi = lokasi
data1.waktu = waktu
  
for(let i of gempa){
if(!anus.includes(i)) {
gempa.splice(gempa.indexOf(i,1)) 
console.log("menghapus auto update gempa pada group")
} else {
await sleep(3000)
conn.sendMessage(i,{image,caption}) 
}
}
}

  
} else {
let getGroups = await conn.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)

db.data.others['infogempa'] = {
lokasi : lokasi,
waktu: waktu
}

  
for(let i of gempa){
if(!anus.includes(i)) {
gempa.splice(gempa.indexOf(i,1)) 
console.log("menghapus auto update gempa pada group")
} else {
await sleep(3000)
conn.sendMessage(i,{image,caption}) 
}
}
 
} 

}, 60_000*10)// akhir dari set interval

}//akhir dari gempa.length
    // Pengaturan waktu buka/tutup grup
    const groupTime = db.data.others['groupTime'] || [];
    setInterval(async () => {
      const now = Date.now();
      for (const entry of groupTime) {
        const chat = global.db.data.chats[entry.id];
        if (!chat) continue;

        if (chat.open && now >= chat.open) {
          await updateGroupStatus(conn, entry.id, 'not_announcement', 'Grup dibuka oleh admin. Sekarang member dapat mengirim pesan.');
          chat.open = 0;
        } else if (chat.close && now >= chat.close) {
          await updateGroupStatus(conn, entry.id, 'announcement', 'Grup ditutup oleh admin. Sekarang hanya admin yang dapat mengirim pesan.');
          chat.close = 0;
        }
        await sleep(5000);
      }
    }, 5000);

    async function updateGroupStatus(conn, groupId, status, message) {
      const groups = await conn.groupFetchAllParticipating();
      const groupIds = Object.values(groups).map(group => group.id);

      if (groupIds.includes(groupId)) {
        await conn.groupSettingUpdate(groupId, status);
        conn.sendMessage(groupId, { text: `*Tepat waktu* ${message}` });
      } else {
        const index = groupTime.findIndex(item => item.id === groupId);
        if (index > -1) groupTime.splice(index, 1);
        console.log("Menghapus auto open/close time pada grup");
      }
    }
  } catch (err) {
    console.error("Error in mainFunction:", err);
  }
}

// Fungsi pembantu untuk waktu tunda (sleep)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Ekspor fungsi utama
module.exports = mainFunction;

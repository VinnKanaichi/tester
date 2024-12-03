const fs = require("fs");
const ms = require("parse-ms")

const canvacord = require("canvacord");
const { checkDataName,createDataId,removeDataId,checkDataId,addDataId } = require("../../lib/totalcmd")
const { getBuffer,getRandom } = require("../../lib/myfunc")
                                       
const { userLeveling,userXp } = require("../../lib/user");
const _prem = require("../../lib/premium");

let handler = async (m, { hanz }) => {
  try {
      
const DataId = db.data.data;

    let sender = m.sender;
    let ppimg = await hanz.profilePictureUrl(sender, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60')
	try{
	 let sol = await hanz.fetchStatus(sender)
	var stst = sol.status == undefined ? '' : sol.status 
	} catch(err){
	var stst = ""
	  
	}
const isOwner = ownerNumber.includes(sender) || checkDataId ("owner", sender, DataId) 
const premium = db.data.premium
const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
const gcount = isPremium ? gcounti.prem : gcounti.user
const userLevel = sender? db.data.users[m.sender].level : true
const userExp = sender? db.data.users[m.sender].exp : true
const userId = sender? db.data.users[m.sender].id : true
const amountExp = Math.floor(Math.random() * 10) + 50
const requiredExp = 10000 * userLevel
const userPersen = userExp/requiredExp*100
const userVerified = sender? db.data.users[m.sender].date : true
    // Variabel user
    let user = global.db.data.users[sender];
    if (!user) {
      return hanz.reply(m.chat, '⚠️ Data pengguna tidak ditemukan!', m);
    }

    	let persenya =`${userPersen}`
let nana =`${userExp}/${requiredExp}`
let cekvip = ms(user.premiumTime - Date.now())
let premiumnya = `${cekvip.days} hari ${cekvip.hours} jam ${cekvip.minutes} menit ${cekvip.seconds}`
let prmm = isPremium? isOwner? 'Premium' : user? premiumnya : '' : 'Not Premium'


    let teks = `*]────「 Profile User 」────[*
	
	🆔 Nama : ${m.pushname} 
	💳 Saldo  : Rp ${db.data.users[sender].balance.toLocaleString()}
	✅ Verified : ${userVerified}
	📇 Status :  ${isPremium ? 'Premium':'Free'}
	🧬 Level : ${userLevel}
	🔰 Grade : ${userLeveling(`${db.data.users[sender].level}`)}
	⚡ Exp :  ${userXp(userPersen)} ${persenya.split(".")[0]}%
	♻️ Total Exp : ${nana}
	📟 User Hit : ${db.data.users[sender].hit}
	🤖 Status Bot : ${isOwner ? 'Owner':'User'}
	🕔 Expired : ${prmm}
	📉 Limit : ${isPremium ? 'Unlimited' : `${db.data.users[sender].limit}/${limitCount}`}
	📈 Limit Game : ${isPremium ? 'Unlimited' : `${db.data.users[sender].glimit}/${gcounti.user}`}
	📲 No : wa.me/${sender.split("@")[0]}
	🧸 Bio : ${stst}`

    // Membuat kartu menggunakan Canvacord
    let rankCard = new canvacord.Rank()
       .setAvatar(ppimg)
    .setCurrentXP(Math.floor(userExp)) // Pastikan 'math()' dikoreksi menjadi 'Math.floor()'
    .setRequiredXP(requiredExp)
    .setStatus("online")
    .setProgressBar("#FFFFFF", "COLOR") // Depan putih (#FFFFFF), belakang biru (#0000FF)
    .setBackground("COLOR", "#A0C8D0") // Mengubah background menjadi biru (#0000FF)
    .setCustomStatusColor("#ff1a8c")
    .setUsername(`EXP: ${persenya.split(".")[0]}%,`)
    .setLevel(userLevel)
    .setRank(4)
    .setOverlay("#A4D3EE") // Overlay menjadi putih (#FFFFFF)
    .setDiscriminator("0007");

      let foto = await getRandom(".png")
	  rankCard.build()
	  .then(async data => {
	  await canvacord.write(data,foto);
	  let gambar = await fs.readFileSync(foto)
	hanz.sendMessage(m.chat, { caption: teks, image: gambar}, {quoted: m})
	  await fs.unlinkSync(foto)
			  });
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, '❌ Terjadi kesalahan dalam menampilkan profil!', m);
  }
};

handler.help = ['me', 'profil'];
handler.tags = ['tools'];
handler.command = /^(me|profil)$/i;

module.exports = handler;

let handler = async (m, { setReply }) => {
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 

let pnel = Ehztext(`
🎉 Selamat datang di *PRICE LIST PANEL* kami! 🎉

📡 *Unlimited*
Nikmati akses *RAM & CPU Unlimited* tanpa batas. 
💰 *Rp10.000*

📡 *1GB Panel*
1GB RAM, CPU 50%. Ideal untuk kebutuhan ringan.
💰 *Rp1.000*

📡 *2GB Panel*
2GB RAM, CPU 70%. Cocok untuk performa lebih.
💰 *Rp2.000*

📡 *3GB Panel*
3GB RAM, CPU 100%. Performa optimal untuk proyek besar.
💰 *Rp3.000*

📡 *4GB Panel*
4GB RAM, CPU 125%. Menunjang aplikasi dengan kebutuhan tinggi.
💰 *Rp4.000*

📡 *5GB Panel*
5GB RAM, CPU 150%. Bagi pengguna profesional.
💰 *Rp5.000*

📡 *6GB Panel*
6GB RAM, CPU 175%. Performa unggul dengan kapasitas besar.
💰 *Rp6.000*

📡 *7GB Panel*
7GB RAM, CPU 175%. Kapasitas luas untuk kebutuhan khusus.
💰 *Rp7.000*

📡 *8GB Panel*
8GB RAM, CPU 200%. Solusi terbaik untuk kebutuhan maksimal.
💰 *Rp8.000*

🤖 *JadiBot*
Akses bot selama 15 hari. 
💰 *Rp7.000*

---

✨ *Keuntungan Menggunakan Panel Kami* ✨
- Hemat kuota untuk pengalaman lebih baik
- Server aktif meski Anda keluar dari situs
- Script terjaga dan aman (*No Culik SC*)
- Garansi uang kembali jika terjadi kendala situs (Hubungi Admin)

🎈 Ayo bergabung dan nikmati layanan unggulan kami yang telah kami siapkan untuk Anda!
`)


setReply(pnel)
}

handler.command = /^(listpanel)$/i;
handler.tags = ['info'];
handler.help = ['panel'];

module.exports = handler;
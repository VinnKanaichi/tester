const fs = require('fs');

let handler = async (m, { hanz, setReply }) => {
    // Membaca daftar reseller dari file JSON
    const userResPanel = JSON.parse(fs.readFileSync("./database/reselerpanel.json"));

    // Mengecek apakah pengirim adalah reseller berdasarkan nomor WhatsApp
    const isResPanel = userResPanel.includes(m.sender.replace('@s.whatsapp.net', ''));

    let teks = "*📋 Daftar Reseller Panel 📋*\n\n";

    if (userResPanel.length === 0) {
        teks += "Tidak ada reseller yang terdaftar saat ini.";
    } else {
        teks += "*✨ Daftar Reseller:* \n\n";
        for (const x of userResPanel) {
            teks += `🔹 @${x}\n`; // Menambahkan ikon untuk menampilkan nomor reseller
        }
    }

    teks += `\n*🔍 Total Reseller:* ${userResPanel.length}\n`; // Menampilkan total reseller
    teks += "*📌 Terima kasih telah bergabung dengan kami! 🎉*"; // Menambahkan pesan penutup

    // Mengirimkan pesan yang berisi daftar reseller
    setReply(teks);
};

// Menentukan perintah dan akses
handler.help = ['listreselerpanel'];
handler.tags = ['admin'];
handler.command = /^(listreselerpanel)$/i; // Menyesuaikan perintah yang diterima
handler.owner = true;  // Hanya pemilik bot yang bisa menggunakan fitur ini

module.exports = handler;

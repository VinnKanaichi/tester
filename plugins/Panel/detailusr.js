const fetch = require('node-fetch');

const handler = async (m, { args, setReply,isResPanel }) => {
    
    //if (!isResPanel) return setReply(mess.resPanel)
    // Mengambil ID pengguna dari argumen
    let usr = args[0];

    // Memastikan ID pengguna telah diberikan
    if (!usr) return setReply('Silakan berikan ID pengguna yang ingin dilihat.');

    try {
        // Mengambil detail pengguna dari API
        let f = await fetch(`${domain}/api/application/users/${usr}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            }
        });

        // Mengonversi respons menjadi JSON
        let res = await f.json();

        // Memeriksa apakah ada kesalahan, seperti pengguna tidak ditemukan
        if (res.errors) return setReply('*USER TIDAK DITEMUKAN*');

        // Mengambil atribut pengguna dari respons
        let u = res.attributes;

        // Menyusun pesan dengan detail pengguna
        let messageText = `✨ *DETAIL PENGGUNA ${u.username.toUpperCase()}* ✨\n\n`;
        messageText += `\`\`\`ID: ${u.id}\n`;
        messageText += `UUID: ${u.uuid}\n`;
        messageText += `USERNAME: ${u.username}\n`;
        messageText += `EMAIL: ${u.email}\n`;
        messageText += `NAMA: ${u.first_name} ${u.last_name}\n`;
        messageText += `BAHASA: ${u.language}\n`;
        messageText += `ADMIN: ${u.root_admin ? '✅ Ya' : '❌ Tidak'}\n`;
        messageText += `DIBUAT PADA: ${u.created_at}\`\`\``;

        // Mengirimkan pesan ke pengguna
        setReply(messageText);
    } catch (error) {
        console.error(error);
        // Mengirim pesan jika terjadi kesalahan saat mengambil detail pengguna
        setReply('Terjadi kesalahan saat mengambil detail pengguna. Silakan coba lagi nanti.');
    }
};

// Daftar command dan pengaturan plugin
handler.command = ['userdetail'];
handler.help = ['userdetail <ID>'];
handler.tags = ['user'];
handler.selerpanel = true;

module.exports = handler;

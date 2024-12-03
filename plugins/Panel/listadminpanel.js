const fetch = require('node-fetch');

const handler = async (m, { args, setReply,isResPanel }) => {
    
    if (!isResPanel) return setReply(mess.resPanel)
    // Mengambil halaman dari argumen, default ke 1
    let page = args[0] ? args[0] : '1';

    try {
        // Mengambil daftar pengguna dari API
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            }
        });

        // Mengonversi respons menjadi JSON
        let res = await f.json();
        let users = res.data;
        let messageText = "👮‍♂️ *DAFTAR ADMIN* 👮‍♂️\n\n";

        // Memeriksa setiap pengguna untuk melihat apakah mereka adalah admin
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🌟 *ID*: ${u.id} - *Status*: ${u.attributes?.user?.server_limit === null ? 'Tidak Aktif' : 'Aktif'}\n`;
                messageText += `👤 *Username*: ${u.username}\n`;
                messageText += `📛 *Nama*: ${u.first_name} ${u.last_name}\n\n`;
            }
        }

        // Menambahkan informasi halaman dan total admin
        messageText += `📄 *Halaman*: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `🔢 *Total Admin*: ${res.meta.pagination.count}`;
let teksNy = Ehztext(messageText)
        // Mengirim pesan ke pengguna
        //await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });
setReply(teksNy)
        // Menyediakan navigasi halaman selanjutnya jika ada
        if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
     
            
 setReply(`🔄 Gunakan perintah .listadmin ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
        }
    } catch (error) {
        console.error(error);
        // Mengirim pesan jika terjadi kesalahan saat mengambil daftar admin
        setReply('❌ Terjadi kesalahan saat mengambil daftar admin. Silakan coba lagi nanti.');
    }
};

// Daftar command dan pengaturan plugin
handler.command = ['listadminpanel'];
handler.help = ['listadmin <halaman>'];
handler.tags = ['admin'];
handler.limit = false;

module.exports = handler;

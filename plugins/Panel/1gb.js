const fetch = require('node-fetch');
const fs = require('fs');

// Baca daftar reseller dari file JSON


const handler = async (m, { text, setReply, hanz }) => {
    // Cek apakah pengirim adalah reseller
 const userResPanel = JSON.parse(fs.readFileSync("./database/reselerpanel.json"));  
const isResPanel = userResPanel.includes(m.sender.replace('@s.whatsapp.net', ''));

if (!isResPanel) return setReply("❌ Akses Ditolak!\n\nMaaf, fitur ini hanya dapat digunakan oleh anggota Reseller Panel.");


    // Pastikan format teks benar
    let t = text.split(',');
    if (t.length < 2) return setReply(`*Format salah!*\nPenggunaan:\n.1gb user,nomer`);

    // Definisikan variabel yang dibutuhkan
    let username = t[0];
    let u = t[1] + '@s.whatsapp.net';
    let name = username + " 1GB";
    let egg = global.eggs;
    let loc = global.location;
    let memo = "1024";
    let cpu = "50";
    let disk = "0";
    let email = `${username}505@gmail.com`;
    let akunlo = "https://pomf2.lain.la/f/cleee3o1.jpg";
    let password = username + "001";

    if (!u) return;

    // Lakukan proses pembuatan pengguna, server, dan pengiriman pesan
    try {
        let d = (await hanz.onWhatsApp(u.split`@`[0]))[0] || {};
        
        // Buat akun pengguna baru
        let f = await fetch(`${domain}/api/application/users`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            },
            body: JSON.stringify({
                email: email,
                username: username,
                first_name: username,
                last_name: username,
                language: "en",
                password: password
            })
        });

        let data = await f.json();
        if (data.errors) return setReply(JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;

        // Dapatkan informasi startup command
        let f2 = await fetch(`${domain}/api/application/nests/5/eggs/${egg}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            }
        });

        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        // Buat server baru
        let f3 = await fetch(`${domain}/api/application/servers`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta,
            },
            body: JSON.stringify({
                name: name,
                description: " ",
                user: user.id,
                egg: parseInt(egg),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: startup_cmd,
                environment: {
                    INST: "npm",
                    USER_UPLOAD: "0",
                    AUTO_UPDATE: "0",
                    CMD_RUN: "npm start"
                },
                limits: {
                    memory: memo,
                    swap: 0,
                    disk: disk,
                    io: 500,
                    cpu: cpu  
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(loc)],
                    dedicated_ip: false,
                    port_range: [],
                },
            })
        });

        let res = await f3.json();
        if (res.errors) return setReply(JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;

        // Pesan sukses dengan detail akun
        let ctf = `🎉 *SELAMAT! Anda Telah Mendaftar di Panel Kami!* 🎉\n\n` +
                  `*🆔 Informasi Akun Anda:* \n` +
                  `• *USERNAME:* ${user.username}\n` +
                  `• *PASSWORD:* ${password}\n` +
                  `• *LOGIN:* ${domain}\n\n` +
                  `*📋 Penting untuk Diketahui:* \n` +
                  `1. *Data akun Anda hanya akan dikirimkan sekali.* Harap simpan informasi ini dengan aman. Jika data akun Anda hilang, kami tidak dapat mengirim ulang.\n` +
                  `2. *Garansi hanya berlaku satu kali.* Klaim garansi harus disertai bukti pembelian.\n` +
                  `3. *Dilarang menjalankan skrip DDoS di panel kami.* Pelanggaran dapat mengakibatkan penghapusan akun dan server tanpa pemberitahuan.\n\n` +
                  `✨ *Terima kasih telah bergabung! Kami berharap Anda menikmati pengalaman Anda bersama kami.* ✨`;

        // Kirim pesan dengan gambar ke pengguna
        await hanz.sendMessage(u, { image: { url: akunlo }, caption: ctf });
        let successMessage = "✅ *Proses berhasil! Akun 1GB telah dibuat.*";
        await hanz.sendMessage(m.chat, { text: successMessage }, { quoted: m });

    } catch (error) {
        console.error(error);
        setReply("Terjadi kesalahan, silakan coba lagi nanti.");
    }
};

// Daftar command dan pengaturan plugin
handler.command = ['1gb'];
handler.help = ['createaccount user,nomor'];
handler.tags = ['admin'];
//handler.selerpanel = true;

module.exports = handler;

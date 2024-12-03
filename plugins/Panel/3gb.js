const fetch = require('node-fetch');

const handler = async (m, { text, setReply, hanz,isResPanel }) => {
    
   // if (!isResPanel) return setReply(mess.resPanel)
    let t = text.split(',');
    if (t.length < 2) return setReply(`*Format salah!*\nPenggunaan:\n.3gb user,nomer`);

    let username = t[0];
    let u = t[1] + '@s.whatsapp.net';
    let name = username + "3GB";
    let egg = global.eggs;
    let loc = global.location;
    let memo = "3072"; // Memory in MB
    let cpu = "100"; // CPU limit
    let disk = "0"; // Disk space
    let email = username + "505@gmail.com";
    let akunlo = "https://pomf2.lain.la/f/cleee3o1.jpg"; 

    if (!u) return;

    // Mencari pengguna di WhatsApp
    let d = (await hanz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "001";

    // Membuat pengguna baru
    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiPlta
        },
        "body": JSON.stringify({
            "email": email,
            "username": username,
            "first_name": username,
            "last_name": username,
            "language": "en",
            "password": password
        })
    });

    let data = await f.json();
    if (data.errors) return setReply(JSON.stringify(data.errors[0], null, 2));
    
    let user = data.attributes;

    // Mendapatkan informasi startup command
    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiPlta
        }
    });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    // Membuat server baru
    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiPlta,
        },
        "body": JSON.stringify({
            "name": name,
            "description": " ",
            "user": user.id,
            "egg": parseInt(egg),
            "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
            "startup": startup_cmd,
            "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "npm start"
            },
            "limits": {
                "memory": memo,
                "swap": 0,
                "disk": disk,
                "io": 500,
                "cpu": cpu
            },
            "feature_limits": {
                "databases": 5,
                "backups": 5,
                "allocations": 1
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

    // Menyiapkan pesan dengan detail akun
    let ctfff = `🌟 *SELAMAT DATANG di Panel Kami!* 🌟\n\n` +
                `🔑 *Detail Akun Anda:* \n` +
                `• *USERNAME:* ${user.username}\n` +
                `• *PASSWORD:* ${password}\n` +
                `• *LOGIN DI SINI:* ${domain}\n\n` +
                `📌 *Penting untuk Diketahui:* \n` +
                `1. *Data akun ini hanya akan dikirimkan sekali.* Harap simpan informasi ini dengan aman. Jika Anda kehilangan data akun, kami tidak dapat mengirim ulang.\n` +
                `2. *Garansi hanya berlaku satu kali.* Klaim garansi harus disertai bukti pembelian.\n` +
                `3. *Dilarang keras menjalankan skrip DDoS di panel kami.* Pelanggaran dapat mengakibatkan penghapusan akun dan server tanpa pemberitahuan.\n\n` +
                `✨ *Terima kasih telah bergabung! Kami berharap Anda menikmati pengalaman Anda bersama kami. Jika ada pertanyaan, jangan ragu untuk menghubungi kami.* ✨`;

    // Mengirim pesan dengan gambar
    await hanz.sendMessage(u, { image: { url: akunlo }, caption: ctfff });

    // Mengirim pesan sukses ke pengirim perintah
    let successMessage = "✅ *Proses berhasil! Akun 3GB telah dibuat.*";
    await hanz.sendMessage(m.chat, { text: successMessage });
};

// Daftar command dan pengaturan plugin
handler.command = ['3gb']; // Ganti dengan command yang sesuai
handler.help = ['createaccount user,nomor'];
handler.tags = ['admin'];
handler.selerpanel = true;


module.exports = handler;

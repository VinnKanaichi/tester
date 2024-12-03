
 const fetch = require('node-fetch');
const toMs = require('ms');

const handler = async (m, { text, usedPrefix, command, setReply, hanz,isResPanel }) => {
    
    if (!isResPanel) return setReply(mess.resPanel)
    let t = text.split(',');
    if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${usedPrefix + command} user,nomer`);

    let username = t[0];
    let u = t[1] + '@s.whatsapp.net';
    let name = username + "Unli";
    let egg = global.eggs;
    let loc = global.location;
    let memo = "0";
    let cpu = "0";
    let disk = "0";
    let email = username + "505@gmail.com";

    if (!u) return;

    let d = (await hanz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "001";

    // Inform user that the process is starting
    await m.reply(`*Proses sedang berjalan...*`);

    // Mengambil durasi dari waktu yang diberikan (waktu seharusnya diambil dari variabel)
   

    let f = await fetch(domain + "/api/application/users", {
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
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

    let user = data.attributes;

    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiPlta
        }
    });

    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup;

    let f3 = await fetch(domain + "/api/application/servers", {
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
    if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    let message = `✨ *Halo Kak! Selamat Datang di Panel* ✨

📋 *Data Akun Panel Anda:*
• *USERNAME*: ${user.username}
• *PASSWORD*: ${password}
• *LOGIN*: ${domain}

📝 *Catatan Penting:*
1. *Owner hanya akan mengirimkan data akun Anda sekali.* 
   Harap simpan dengan baik! Jika data akun Anda hilang, owner tidak dapat mengirim ulang.
2. *Garansi hanya berlaku sekali.*
   Klaim garansi harus disertai bukti pembelian.
3. *Jangan menjalankan script DDoS di panel!*
   Pelanggaran akan mengakibatkan penghapusan akun dan server tanpa notifikasi.

Terima kasih atas perhatian Anda! 🌟`;

    await hanz.sendMessage(u, { image: { url: "https://pomf2.lain.la/f/cleee3o1.jpg" }, caption: message });

    let successMessage = "✅ *Proses berhasil! Akun Unlimited telah dibuat.*";
    await hanz.sendMessage(m.chat, { text: successMessage },{quoted:m});

    // Memberi tahu pengguna bahwa proses telah selesai
    await m.reply(`*Proses selesai!* Akun Anda telah berhasil dibuat dan siap digunakan.`);
}
    // Daftar command dan pengaturan plugin
    handler.command = ['unli'];
    handler.help = ['unli'];
    handler.tags = ['panel'];
    handler.limit = false;

    module.exports = handler;

                

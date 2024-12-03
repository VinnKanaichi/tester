const fetch = require('node-fetch');

const handler = async (m, { text, setReply, hanz,isResPanel}) => {
    
    //if (!isResPanel) return setReply(mess.resPanel)
    let t = text.split(',');
    if (t.length < 2) return setReply(`*Format salah!*\nPenggunaan:\n.5gb user,nomer`);

    let username = t[0];
    let u = t[1] + '@s.whatsapp.net';
    let name = username + "5GB";
    let egg = global.eggs;
    let loc = global.location;
    let memo = "5138"; // Memory in MB
    let cpu = "150"; // CPU limit
    let disk = "0"; // Disk space
    let email = username + "505@gmail.com";
    let akunlo = "https://pomf2.lain.la/f/cleee3o1.jpg"; 

    if (!u) return;

    let d = (await hanz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "0011";

    // Create new user
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

    // Get startup command
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

    // Create new server
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

    // Prepare the message text
    let messageText = `*🌟 Halo ${m.pushname}, Selamat Datang di Panel Anda! 🌟*

*🔐 Detail Akun Anda:*

*• USERNAME* : ${user.username}
*• PASSWORD* : ${password}
*• LOGIN* : ${domain}

*📝 Catatan Penting:* 
[1] *Hanya 1X Data Akun Dikirim!*
Mohon simpan baik-baik, jika hilang kami tidak dapat mengirim ulang.

[2] *Garansi Cuma 1X* 
Klaim garansi harus disertai bukti pembelian.

[3] *Jangan Jalankan Script DDoS di Panel!*  
Jika tidak, akun Anda akan dihapus tanpa pemberitahuan!`;

    // Send text with image in a single message
    await hanz.sendMessage(u, {
        image: { url: akunlo },
        caption: messageText
    });

    // Send success message to the command sender
    let successMessage = "✅ *Proses Berhasil! Akun 5GB Anda Telah Dibuat.*";
    await hanz.sendMessage(m.chat, { text: successMessage });
};

// Daftar command dan pengaturan plugin
handler.command = ['5gb']; // Ganti dengan command yang sesuai
handler.help = ['createaccount user,nomor'];
handler.tags = ['admin'];
handler.selerpanel = true;


module.exports = handler;

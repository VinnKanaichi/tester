const fetch = require('node-fetch');

const handler = async (m, { text, setReply, hanz,isResPanel }) => {
    
  //  if (!isResPanel) return setReply(mess.resPanel)
    let t = text.split(',');
    if (t.length < 2) return setReply(`*Format salah!*\nPenggunaan:\n.6gb user,nomer`);

    let username = t[0];
    let u = t[1] + '@s.whatsapp.net';
    let name = username; // Server name based on username
    let egg = global.eggs; // Egg type from global variables
    let loc = global.location; // Deployment location
    let memo = "6000"; // Memory limit in MB
    let cpu = "175"; // CPU limit
    let disk = "6000"; // Disk space in MB
    let email = username + "505@gmail.com"; // User email
    let akunlo = "https://pomf2.lain.la/f/cleee3o1.jpg"; // Image URL

    if (!u) return;

    // Check if the user is already on WhatsApp
    let d = (await hanz.onWhatsApp(u.split`@`[0]))[0] || {};
    let password = username + "009118"; // User password

    // Create a new user
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

    // Get the startup command for the egg
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

    // Create a new server
    let f3 = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiPlta
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
            }
        })
    });

    let res = await f3.json();
    if (res.errors) return setReply(JSON.stringify(res.errors[0], null, 2));

    let server = res.attributes;

    // Prepare the message text
    let messageText = `*👋 Halo kak, Berikut Adalah Panel Anda!*

*📋 Data Akun Panel Anda:*

• USERNAME: ${user.username}
• PASSWORD: ${password}
• LOGIN: ${domain}

*⚠️ Penting:*

1. *Hanya 1X Data Akun Dikirim!*
   Mohon simpan baik-baik, jika hilang kami tidak dapat mengirim ulang.

2. *Garansi Cuma 1X* 
   Klaim garansi harus disertai bukti pembelian.

3. *Jangan Jalankan Script DDoS di Panel!*  
   Jika tidak, akun Anda akan dihapus tanpa pemberitahuan!`;

    // Send message with image
    await hanz.sendMessage(u, {
        text: messageText,
        image: { url: akunlo }
    });

    // Notify the command sender of success
    await hanz.sendMessage(m.chat, { text: "✅ *Proses Berhasil! Akun 6GB Anda Telah Dibuat.*" });
};

// Daftar command dan pengaturan plugin
handler.command = ['6gb']; // Ganti dengan command yang sesuai
handler.help = ['createaccount user,nomor'];

handler.selerpanel = true;

module.exports = handler;

const fetch = require('node-fetch');

const handler = async (m, { text, setReply, hanz,isResPanel }) => {
    
   // if (!isResPanel) return setReply(mess.resPanel)
    let t = text.split(',');
    if (t.length < 2) return setReply(`*Format salah!*\nPenggunaan:\n.2gb user,nomer`);

    let username = t[0]; // Get username from input
    let u = t[1] + '@s.whatsapp.net'; // Format the WhatsApp number
    let name = username + " 2GB"; // Server name for 2GB
    let egg = global.eggs; // Egg ID from global variable
    let loc = global.location; // Location from global variable
    let memo = "2048"; // Memory in MB for 2GB
    let cpu = "70"; // CPU limit
    let disk = "0"; // Disk space
    let email = `${username}505@gmail.com`; // Email format
    let akunlo = "https://pomf2.lain.la/f/cleee3o1.jpg"; // Image URL for message
    let password = username + "001"; // Password format

    if (!u) return;

    // Check if the WhatsApp user exists
    let d = (await hanz.onWhatsApp(u.split`@`[0]))[0] || {};

    // Create a new user account
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
    let data = await f.json(); // Parse response
    if (data.errors) return setReply(JSON.stringify(data.errors[0], null, 2)); // Handle errors
    let user = data.attributes; // Extract user attributes

    // Get startup command for the egg
    let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiPlta
        }
    });
    let data2 = await f2.json();
    let startup_cmd = data2.attributes.startup; // Extract startup command

    // Create a new server
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
    let res = await f3.json(); // Parse server creation response
    if (res.errors) return setReply(JSON.stringify(res.errors[0], null, 2)); // Handle errors
    let server = res.attributes; // Extract server attributes

    // Prepare the message with account information
    let ctff = `🌟 *SELAMAT DATANG di Panel Kami!* 🌟\n\n` +
`🔑 *Detail Akun Anda:* \n` +
`• *USERNAME:* ${user.username}\n` +
`• *PASSWORD:* ${password}\n` +
`• *LOGIN DI SINI:* ${domain}\n\n` +
`📌 *Penting untuk Diperhatikan:* \n` +
`1. *Data akun ini hanya akan dikirimkan sekali.* Harap simpan informasi ini dengan aman. Jika Anda kehilangan data akun, kami tidak dapat mengirim ulang.\n` +
`2. *Garansi hanya berlaku satu kali.* Klaim garansi harus disertai bukti pembelian.\n` +
`3. *Dilarang keras menjalankan skrip DDoS di panel kami.* Pelanggaran dapat mengakibatkan penghapusan akun dan server tanpa pemberitahuan.\n\n` +
`✨ *Terima kasih telah bergabung! Kami berharap Anda menikmati pengalaman Anda bersama kami. Jika ada pertanyaan, jangan ragu untuk menghubungi kami.* ✨`;


    // Send the account information message with an image
    await hanz.sendMessage(u, { image: { url: akunlo }, caption: ctff });

    // Send success message to the command sender
    let successMessage = "✅ *Proses berhasil! Akun 2GB telah dibuat.*";
    await hanz.sendMessage(m.chat, { text: successMessage },{quoted:m});
};

// Command registration
handler.command = ['2gb']; // Command to trigger the handler
handler.help = ['createaccount user,nomor']; // Help description
handler.tags = ['admin']; // Tag for categorization
handler.selerpanel = true;
// No limit on usage

module.exports = handler;

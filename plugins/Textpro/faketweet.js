const { getBuffer } = require('../../lib/myfunc');

const handler = async (m, { hanz, setReply, prefix, command, q,sendReact }) => {
  try {
   
    if (!q) return setReply(`Contoh: ${prefix + command} Name1 | Name2 | Text`);
    sendReact('⚡')
    let ppimg;
    try {
      
      ppimg = await hanz.profilePictureUrl(m.sender, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60');
    } catch (err) {
      console.log(err);
      ppimg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';
    }

    
    const its = await getBuffer(ppimg);
    
    
    const parts = q.split("|");
    if (parts.length < 3) return setReply(`Format tidak valid. Contoh: Name1 | Name2 | Text`);

    const nama1 = parts[0].trim();  // Nama pengguna 1
    const nama2 = parts[1].trim();  // Nama pengguna 2
    const katakata = parts[2].trim();  // Teks tweet

    
    const canvafy = require('canvafy');
    const tweet = await new canvafy.Tweet()
      .setTheme("light")
      .setUser({ displayName: nama1, username: nama2 })
      .setVerified(true)
      .setComment(katakata)
      .setAvatar(its) 
      .build();


    await hanz.sendMessage(m.chat, { image: tweet, caption: '_success_' }, { quoted: m });
  } catch (error) {
    console.error(error);
    setReply(`Terjadi kesalahan saat membuat tweet: ${error.message}`);
  }
};

handler.help = ['faketweet'];
handler.command = ['faketweet'];
handler.tags = ['textpro'];
handler.premium = false;
handler.group = true;

module.exports = handler;

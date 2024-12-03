let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  
    var autoBio = db.data.settings['settingbot'].autoBio
   var publik = db.data.settings['settingbot'].publik 
    // AUTO BIO BOT
    if (autoBio) {
        let data = global.db.data.others['runtime'];
        let time = (new Date() - data.runtime);
        
        // Pastikan clockString adalah fungsi yang valid
        let bio = `Im ${botName} 🤖 || ⏰ Runtime ${clockString(time)} || 🌎 Mode: ${publik ? 'Public' : 'Self'} || 🎨 Created By ${ownerName}`;
        
        try {
            await hanz.updateProfileStatus(bio);
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = handler;

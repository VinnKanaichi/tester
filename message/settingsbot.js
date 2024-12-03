


module.exports.settings = async function(m,isNumber) {
  try {
 const settings = global.db.data.settings['settingbot']
if(settings){
//Auto settings
if (!isNumber(settings.status)) setting.status = new Date() * 1
if (!('setmenu' in settings)) settings.setmenu = "web"
if (!('autoBio' in settings)) settings.autoBio = true
if (!('multi' in settings)) settings.multi = true
if (!('prefix' in settings)) settings.prefix = "!"
if (!('autoblockcmd' in settings)) settings.autoblockcmd = false
if (!('autoDetectCmd' in settings)) settings.autoDetectCmd = false
if (!('replyType' in settings)) settings.replyType = "web"
if (!('welcomeType' in settings)) settings.welcomeType = "web"
if (!('leafType' in settings)) settings.leafType  = "web"
if (!('autoReport' in settings)) settings.autoReport = true
if (!('autoLevel' in settings)) settings.autoLevel = true
if (!('autoSticker' in settings)) settings.autoSticker = false
if (!('autoRead' in settings)) settings.autoRead = false
if (!('publik' in settings)) settings.publik = true
 
} else { global.db.data.settings['settingbot'] = {
status: new Date() * 1, 
setmenu: "web",
autoBio: true,
multi: true,
prefix: "!",
autoblockcmd: false,
autoDetectCmd: false,
replyType: "web",
welcomeType: "web",
leafType: "web",
autoReport: true,
autoLevel: true,
autoSticker: false,
autoRead: true,
publik : true
}
}
  } catch (e) {
    console.error(e);
  }
};

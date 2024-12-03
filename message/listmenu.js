const chalk = require ('chalk')
const fs = require ('fs')
const { color, bgcolor } = require('../lib/color')

const Ehztext = (text, style = 1) => {
  var abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var ehz = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  abc.map((v, i) =>
    replacer.push({
      original: v,
      convert: ehz[style].split('')[i]
    })
  );
  var str = text.split('');
  var output = [];
  str.map((v) => {
    if (v.toUpperCase() !== v.toLowerCase() && v === v.toUpperCase()) {
      // If the character is uppercase, push it unchanged
      output.push(v);
    } else {
      // If the character is lowercase or not a letter, find and convert it
      const find = replacer.find((x) => x.original == v.toLowerCase());
      find ? output.push(find.convert) : output.push(v);
    }
  });
  return output.join('');
};

global.imgMenu = {
    all: 'https://pomf2.lain.la/f/nyyr3gb7.jpg',
    info: 'https://pomf2.lain.la/f/o4gnkwqm.jpg',
    anonymous: 'https://pomf2.lain.la/f/f3vt9oa.jpg',
    group: 'https://pomf2.lain.la/f/up7cml4e.jpg',    game: 'https://pomf2.lain.la/f/eiqsqg5i.jpg',
    rpg: 'https://pomf2.lain.la/f/n8z4kah3.jpg',
    download: 'https://pomf2.lain.la/f/7e4cq1yo.jpg',
    ai: 'https://pomf2.lain.la/f/m1f5azut.jpg',
    sticker: 'https://pomf2.lain.la/f/m01axuly.jpg',
    fun: 'https://pomf2.lain.la/f/2gcstp16.jpg',
    tools: 'https://pomf2.lain.la/f/rkpe24t.jpg',
    shorturl:'https://pomf2.lain.la/f/hu9s8b62.jpg',
    search: 'https://pomf2.lain.la/f/utm71qro.jpg',
    uploader: 'https://pomf2.lain.la/f/0nfjdweo.jpg',
    stalker: 'https://pomf2.lain.la/f/vux8fdq6.jpg',
    convert: 'https://pomf2.lain.la/f/9gl1e4eu.jpg',
    islamic: 'https://pomf2.lain.la/f/8xh0lrr.jpg',
    primbon: 'https://pomf2.lain.la/f/yxud4wc2.jpg',
    quotes: 'https://pomf2.lain.la/f/rxl6pgck.jpg',
    anime: 'https://pomf2.lain.la/f/5lu981te.jpg',
    ephoto: 'https://pomf2.lain.la/f/9cee2c1m.jpg',
    textpro: 'https://pomf2.lain.la/f/tpmooexs.jpg',
    nsfw: 'https://pomf2.lain.la/f/50ov59o7.jpg',
    panel: 'https://pomf2.lain.la/f/4ldnqbsm.jpg',
    topup: 'https://pomf2.lain.la/f/mz97crdo.jpg',
    bug: 'https://pomf2.lain.la/f/x5l8u23z.jpg',
    storage: 'https://pomf2.lain.la/f/qtdzdf08.jpg',
    settings: 'https://pomf2.lain.la/f/okcyvwie.jpg',
    owner: 'https://pomf2.lain.la/f/nyyr3gb7.jpg',
};

global.thanksto = (prefix) => {
return Ehztext(`${gris}✨ Ucapan Terima Kasih yang Dalam untuk ${gris}
◈ Allah Swt 🙏
◈ Orang Tua ❤️
◈ Penyedia Base (Dittaz) 💻
◈ Penyedia Modules ⚙️
◈ Penyedia API 🌐
◈ Ehanz (Rangel × Menhera) 🤖
Dan semua Kreator Bot yang tak bisa saya sebutkan satu per satu 🌟
Semoga kebaikan dan inspirasi selalu menyertai kita semua! 🌈`)
}

global.menuprivate = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ CMD PRIVATE ▣${gris}┈────⊡
╰◈ .ai
╰◈ .remini
╰◈ .confes
╰◈ .menfes
╰◈ .tourl
╰◈ .pesanemail
`)}

global.menuinfo = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ INFO ▣${gris}┈────⊡
╰◈ .owner
╰◈ .sosmed
╰◈ .infobot
╰◈ .dashboard 
╰◈ .ping
╰◈ .qris
╰◈ .rules
╰◈ .speed
╰◈ .runtime
╰◈ .sc
╰◈ .myip`)}

global.menuanonymous = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ ANONYMOUS ▣${gris}┈────⊡
╰◈ .menfes
╰◈ .confes
╰◈ .pesanemail
╰◈ .`)}

global.menugrup = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ GROUP ▣${gris}┈────⊡
╰◈ .on (keamanan)
╰◈ .absen
╰◈ .mulaiabsen
╰◈ .cekabsen
╰◈ .hapusabsen
╰◈ .inspect
╰◈ .intro
╰◈ .delete
╰◈ .opentime
╰◈ .closetime
╰◈ .gc
╰◈ .infogc
╰◈ .linkgc
╰◈ .resetlinkgc
╰◈ .add
╰◈ .kick
╰◈ .addkick
╰◈ .delkick
╰◈ .listkick
╰◈ .promote
╰◈ .demote
╰◈ .tagadmin
╰◈ .tagme
╰◈ .hidetag
╰◈ .tagall
╰◈ .jid
╰◈ .read
╰◈ .listonline
╰◈ .jodohku
╰◈ .jadian
╰◈ .caridoi
╰◈ .tembak
╰◈ .terima
╰◈ .tolak
╰◈ .putus
╰◈ .tag
╰◈ .getname
╰◈ .setppgc
╰◈ .delppgc
╰◈ .getppgc
╰◈ .setnamegc
╰◈ .setdesc
╰◈ .banstik
╰◈ .unbanstik`)}

global.menugame = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ GAME ▣${gris}┈────⊡
╰◈ .tebakgambar
╰◈ .tebakbendera
╰◈ .tebakkata
╰◈ .tebaktebakan
╰◈ .tebaklirik
╰◈ .tebaklagu
╰◈ .tekateki
╰◈ .tebakkimia
╰◈ .susunkata
╰◈ .siapaaku
╰◈ .family100
╰◈ .caklontong
╰◈ .tictactoe
╰◈ .topbalance
╰◈ .profil
╰◈ .claimgame
╰◈ .tf
╰◈ .limit
╰◈ .shopc
╰◈ .buylimit
╰◈ .buyglimit
╰◈ .givelimit
╰◈ .kuranglimit
╰◈ .givesaldo
╰◈ .kurangsaldo
╰◈ .caradapetlimit`)}

global.menurpg = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ RPG ▣${gris}┈────⊡
╰◈ .daftar
╰◈ .unreg
╰◈ .my
╰◈ .tomoney
╰◈ .adventure
╰◈ .bank
╰◈ .nabung
╰◈ .tarik
╰◈ .korupsi
╰◈ .belipet
╰◈ .berburu
╰◈ .berdagang
╰◈ .berkebun
╰◈ .bonus
╰◈ .buah
╰◈ .build
╰◈ .bunuh
╰◈ .casino
╰◈ .collect
╰◈ .cook / masak
╰◈ .cooldown
╰◈ .craft
╰◈ .daily
╰◈ .dungeon
╰◈ .eat / makan
╰◈ .berimakan
╰◈ .fight
╰◈ .gajian
╰◈ .go / pergi
╰◈ .heal
╰◈ .hourclaim
╰◈ .hunt
╰◈ .inv 
╰◈ .kandang
╰◈ .karung
╰◈ .kerja
╰◈ .koboy
╰◈ .kolam
╰◈ .latih
╰◈ .lb
╰◈ .maling
╰◈ .mancing
╰◈ .membunuh
╰◈ .mentransfer
╰◈ .meracik
╰◈ .merampok
╰◈ .merchant 
╰◈ .mining
╰◈ .minum
╰◈ .misi
╰◈ .monthly
╰◈ .mulung 
╰◈ .nambang
╰◈ .nebang
╰◈ .nguli
╰◈ .ngojek
╰◈ .open
╰◈ .openbo
╰◈ .pasar
╰◈ .ngelont
╰◈ .petshop
╰◈ .polisi
╰◈ .ramuan
╰◈ .redeem
╰◈ .referal
╰◈ .repair
╰◈ .restoran
╰◈ .rob
╰◈ .roket 
╰◈ .role
╰◈ .nyampah
╰◈ .slectskill
╰◈ .shop 
╰◈ .tokoikan
╰◈ .smelt
╰◈ .smith
╰◈ .sumbangan
╰◈ .taxy
╰◈ .tfplug
╰◈ .upgrade
╰◈ .weekly`)}

global.menudownload = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ DOWNLOAD ▣${gris}┈────⊡
╰◈ .download *all link*
╰◈ .play *masukan judul lagu*
╰◈ .yts *judul*
╰◈ .ytmp4 *link*
╰◈ .ytmp3 *link*
╰◈ .tiktok *link*
╰◈ .tiktoksearch
╰◈ .tiktokaudio *link*
╰◈ .instagram
╰◈ .facebook
╰◈ .capcutdl
╰◈ .playmp4 *judul*
╰◈ .twitterdl 
╰◈ .mediafire *link*
╰◈ .gdrive *link*
╰◈ .gitclone
╰◈ .githubdl
╰◈ .pindl *link*
╰◈ .spotifysearch
╰◈ .spotifydl *link*`)}

global.menuai = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ AI ▣${gris}┈────⊡
╰◈ .ai
╰◈ .autoai
╰◈ .gptai
╰◈ .aivoice
╰◈ .ngel
╰◈ .rangel
╰◈ .blackbox
╰◈ .prabowo
╰◈ .jokowi
╰◈ .megawati`)}


global.menusticker = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ STICKER ▣${gris}┈────⊡
╰◈ .sticker
╰◈ .swm
╰◈ .smeme
╰◈ .ttp
╰◈ .attp
╰◈ .qc *text*
╰◈ .emoji *contoh* 😤
╰◈ .emojimix
╰◈ .telegramsticker *link*
╰◈ .stickhandhold
╰◈ .stickshinobu
╰◈ .stickhighfive
╰◈ .stickcuddle
╰◈ .stickcringe
╰◈ .stickdance
╰◈ .stickhappy
╰◈ .stickglomp
╰◈ .sticksmug
╰◈ .stickblush
╰◈ .stickawoo
╰◈ .stickwave
╰◈ .sticksmile
╰◈ .stickslap
╰◈ .sticknom
╰◈ .stickpoke
╰◈ .stickwink
╰◈ .stickbonk
╰◈ .stickbully
╰◈ .stickyeet
╰◈ .stickbite
╰◈ .stickkiss
╰◈ .sticklick
╰◈ .stickpat
╰◈ .stickhug
╰◈ .stickkill
╰◈ .stickcry
╰◈ .stickspank
╰◈ .sticktickle`)}

global.menufun = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ FUN ▣${gris}┈────⊡
╰◈ .cekjodoh
╰◈ .cekkhodam
╰◈ .cekkontol
╰◈ .cekmemek
╰◈ .citacita
╰◈ .truth
╰◈ .dare
╰◈ .jjmeryani
╰◈ .tiktokghea
╰◈ .tiktokpanrika
╰◈ .tiktokbocil
╰◈ .tiktokkayes
╰◈ .videogalau
╰◈ .cosplayangel
╰◈ .videowibu
╰◈ .chinese
╰◈ .hijab
╰◈ .indo
╰◈ .japanaese
╰◈ .korean
╰◈ .malay
╰◈ .randomboy
╰◈ .randomgirl
╰◈ .thai
╰◈ .vietnamese
╰◈ .cry
╰◈ .kill
╰◈ .hug
╰◈ .pat
╰◈ .lick
╰◈ .kiss
╰◈ .bite
╰◈ .yeet
╰◈ .bully
╰◈ .bonk
╰◈ .wink
╰◈ .poke
╰◈ .nom
╰◈ .slap
╰◈ .smile
╰◈ .wave
╰◈ .awoo
╰◈ .blush
╰◈ .smug
╰◈ .glomp
╰◈ .happy
╰◈ .dance
╰◈ .cringe
╰◈ .cuddle
╰◈ .highfive
╰◈ .handhold
╰◈ .tickle
╰◈ .feed`)}

global.menutools = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ TOOLS ▣${gris}┈────⊡
╰◈ .get
╰◈ .ocr *ambil teks dari gambar*
╰◈ .toqr *link menjadi QR*
╰◈ .ssweb *link website*
╰◈ .sswebvideo 
╰◈ .styletext
╰◈ .remini 
╰◈ .kalkulator
╰◈ .lirik
╰◈ .chord
╰◈ .resize
╰◈ .removebg
╰◈ .gimage
╰◈ .infogempa
╰◈ .infocuaca
╰◈ .jarak *tasik|bandung*`)}

global.menushorturl = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ SHORT URL ▣${gris}┈────⊡
╰◈ .shorturl
╰◈ .adfoc
╰◈ .tinyurl
╰◈ .vgd
╰◈ .ouo
╰◈ .rebrandly`)}

global.menuuploader = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ UPLOADER ▣${gris}┈────⊡
╰◈ .tourl
╰◈ .fileugu
╰◈ .tmpfile
╰◈ .fileditch`)}

global.menusearch = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ SEARCH ▣${gris}┈────⊡
╰◈ .google
╰◈ .walpaper
╰◈ .npmsearch
╰◈ .caripenyakit
╰◈ .cekpenyakit
╰◈ .caribuku
╰◈ .cariresep
╰◈ .resepdetail
╰◈ .bukalapaksearch
╰◈ .stickersearch
╰◈ .carisinyal
╰◈ .detailsinyal
╰◈ .wattpad
╰◈ .playstore
╰◈ .bukalapak
╰◈ .otakudesusearch
╰◈ .animeindosearch
╰◈ .anicin 
╰◈ .githubsearch
╰◈ .kodepos *kota*
`)}

global.menustalker = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ STALKER ▣${gris}┈────⊡
╰◈ .ttstalk
╰◈ .ghstalk
╰◈ .mlstalk
╰◈ .ffstalk`)}

global.menuconvert = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ CONVERT ▣${gris}┈────⊡
╰◈ .kodebahasa
╰◈ .translate
╰◈ .speed-up
╰◈ .sad
╰◈ .sound
╰◈ .tts
╰◈ .bass
╰◈ .blown
╰◈ .deep
╰◈ .earrape
╰◈ .fast
╰◈ .fat
╰◈ .robot
╰◈ .slow
╰◈ .smooth
╰◈ .ghost
╰◈ .hode
╰◈ .chipmunk
╰◈ .reverb
╰◈ .reverse
╰◈ .vocaloid
╰◈ .nightcore
╰◈ .tupai
╰◈ .imut
╰◈ .toptt
╰◈ .toimg
╰◈ .tomp4
╰◈ .tomp3
╰◈ .toptv
╰◈ .togif
╰◈ .volume
╰◈ .volvideo
╰◈ .terbalik
╰◈ .toviewonce`)}


global.menuislamic = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ ISLAMIC ▣${gris}┈────⊡
╰◈ .surah
╰◈ .listsurah
╰◈ .getsurah
╰◈ .alkitab (kristen)
╰◈ .asmaulhusna
╰◈ .audiosurah
╰◈ .ayatkursi
╰◈ .bacaansholat
╰◈ .doaharian
╰◈ .hadist
╰◈ .kisahnabi
╰◈ .niatsholat
╰◈ .randomquran
╰◈ .tahlil`)}

global.menuprimbon = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ PRIMBON ▣${gris}┈────⊡
╰◈ .artinama
╰◈ .artimimpi
╰◈ .kecocokanpasangan
╰◈ .kecocokannama
╰◈ .ramalancinta
╰◈ .jadiannikah
╰◈ .sifatusaha
╰◈ .rezeki
╰◈ .pekerjaan
╰◈ .penyakit
╰◈ .nasib
╰◈ .artitarot
╰◈ .fengshui
╰◈ .haribaik
╰◈ .harisangar
╰◈ .harisial
╰◈ .harinaga
╰◈ .peruntungan
╰◈ .weton
╰◈ .karakter
╰◈ .masasubur
╰◈ .zodiak`)}

global.menuquotes = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ QUOTES ▣${gris}┈────⊡
╰◈ .quotesanime
╰◈ .quotesbacot
╰◈ .quotesbucin
╰◈ .quotesgalau
╰◈ .quotesgombal
╰◈ .quoteshacker
╰◈ .quotesislam
╰◈ .quoteskatabijak
╰◈ .quotesmotivasi
╰◈ .quotespantun
╰◈ .quotesrenungan
╰◈ .quotessenja`)}


global.menuanime = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ ANIME ▣${gris}┈────⊡
╰◈ .randomanime
╰◈ .randomimage
╰◈ .jadianime
╰◈ .jadinyata
╰◈ .loli
╰◈ .cosplay
╰◈ .husbu
╰◈ .milf
╰◈ .wallml
╰◈ .ppcp`)}

global.menuephoto = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ EPHOTO ▣${gris}┈────⊡
╰◈ .glitchtext *teks bebas*
╰◈ .writetext
╰◈ .advancedglow
╰◈ .typographytext
╰◈ .pixelglitch
╰◈ .neonglitch
╰◈ .flagtext
╰◈ .flag3dtext
╰◈ .deletingtext
╰◈ .blackpinkstyle
╰◈ .glowingtext
╰◈ .underwatertext
╰◈ .logomaker
╰◈ .cartoonstyle
╰◈ .papercutstyle
╰◈ .watercolortext
╰◈ .effectclouds
╰◈ .blackpinklogo
╰◈ .gradienttext
╰◈ .summerbeach
╰◈ .luxurygold
╰◈ .multicoloredneon
╰◈ .sandsummer
╰◈ .galaxywallpaper
╰◈ .1917style
╰◈ .makingneon
╰◈ .royaltext
╰◈ .freecreate
╰◈ .galaxystyle
╰◈ .lighteffects`)}

global.menutextpro = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ TEXTPRO ▣${gris}┈────⊡
╰◈ .customsketchlogo
╰◈ .customwaterlogo
╰◈ .fluffylogo
╰◈ .fluffylogo1
╰◈ .sketchlogo
╰◈ .tweetc
╰◈ .faketweet`)}

global.menunsfw = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ NSFW ▣${gris}┈────⊡
╰◈ .paptt
╰◈ .xnxdl
╰◈ .xnxsearch
╰◈ .xvideosearch
╰◈ .xvideosdl
╰◈ .hentaivid
╰◈ .animespank
╰◈ .gifblowjob
╰◈ .blowjob
╰◈ .cuckold
╰◈ .eba
╰◈ .pussy
╰◈ .yuri
╰◈ .zettai
╰◈ .hana`)}

global.menupanel = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ PANEL ▣${gris}┈────⊡
╰◈ .addreselerpanel
╰◈ .delreselerpanel
╰◈ .listreselerpanel
╰◈ .panel
╰◈ .listpanel
╰◈ .listadminpanel
╰◈ .createadmin
╰◈ .listadminpanel
╰◈ .listsrv
╰◈ .delsrv
╰◈ .listusr
╰◈ .detailusr
╰◈ .delusr
`)}

global.menubug = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ BUG ▣${gris}┈────⊡
╰◈ .bugstik
╰◈ .buginvit
╰◈ .buglokasi
╰◈ .bugktalog
╰◈ .`)}

global.menutopup = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ TOP UP ▣${gris}┈────⊡
╰◈ .pricelist
╰◈ .pricelistwallet
╰◈ .pricelistpulsa
╰◈ .pricelistkuota
╰◈ .pricelistgame
╰◈ .saldo
╰◈ .addsaldo
╰◈ .minsaldo
╰◈ .ceksaldo (saldo di website)
╰◈ .cekip (ip provider)
╰◈ .sendqr 62xxx
╰◈ .tutortopup 
╰◈ .tutordepo 
`)}


global.menutoko = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ TOKO EHZ ▣${gris}┈────⊡
╰◈ .pakaian`)}

global.menustorage = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ STORAGE ▣${gris}┈────⊡
╰◈ .addvn
╰◈ .delvn
╰◈ .listvn
╰◈ .addstik
╰◈ .delstik
╰◈ .liststik
╰◈ .addimage
╰◈ .delimage
╰◈ .listimage
╰◈ .addvideo
╰◈ .delvideo
╰◈ .listvideo
╰◈ .addrespon
╰◈ .delrespon
╰◈ .listrespon`)}

global.menusettings = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ SETTINGS ▣${gris}┈────⊡
╰◈ .console
╰◈ .autobio
╰◈ .autosticker
╰◈ .addcmdowner
╰◈ .delcmdpwner
╰◈ .listcmdowner
╰◈ .addcmdprem
╰◈ .delcmdprem
╰◈ .listcmdprem
╰◈ .addcmdlimit
╰◈ .delcmdlimit
╰◈ .listcmdlimit
╰◈ .blockcmd
╰◈ .unblockcmd
╰◈ .listblockcmd
╰◈ .adderror
╰◈ .delerror
╰◈ .listerror
╰◈ .clearallerror
╰◈ .clearalluser
╰◈ .setthumb
╰◈ .setreply
╰◈ .setmenu
╰◈ .restart`)}


global.menuowner = (prefix) => {
return Ehztext(`╭─┈ ${gris}▣ OWNER ▣${gris}┈────⊡
╰◈ .ban
╰◈ .unban
╰◈ .listban
╰◈ .clearallban
╰◈ .block
╰◈ .unblock
╰◈ .listblock
╰◈ .clearallblock
╰◈ .backup
╰◈ .join
╰◈ .out
╰◈ .delfile
╰◈ .delfolder
╰◈ .addplugin
╰◈ .delplugin
╰◈ .listplugin
╰◈ .getplugin
╰◈ .sendplugin
╰◈ .getfunc *function*
╰◈ .addcase
╰◈ .getcase
╰◈ .delcase
╰◈ .listcase
╰◈ .sendcase
╰◈ .broadcast *1gc*
╰◈ .bcuser
╰◈ .bcgc
╰◈ .upch *send ke chanel*
╰◈ .listgc
╰◈ .listpc
╰◈ .addsewa
╰◈ .listsewa
╰◈ .ceksewa
╰◈ .addowner
╰◈ .delowner
╰◈ .listowner
╰◈ .addprem
╰◈ .listprem
╰◈ .delprem
╰◈ .cekprem
╰◈ .public
╰◈ .self
╰◈ .$
╰◈ .> `)}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
	delete require.cache[file]
	require(file)
})
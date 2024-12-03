let handler = async (m, { q, command, prefix, setReply }) => {
    
let teks = Ehztext(`Berikut Adalah List Primbon

┌  ◦ artinama
│  ◦ artimimpi
│  ◦ pasangan
│  ◦ ramalancinta
│  ◦ kecocokannama
│  ◦ pasangan
│  ◦ jadiannikah
│  ◦ sifatusaha
│  ◦ rezeki
│  ◦ pekerjaan
│  ◦ ramalnasib
│  ◦ penyakit
│  ◦ artitarot
│  ◦ fengshui
│  ◦ haribaik
│  ◦ harisangar
│  ◦ harisial
│  ◦ harinaga
│  ◦ arahrezeki
│  ◦ peruntungan
│  ◦ wetonjawa
│  ◦ karakter
│  ◦ keberuntungan
│  ◦ masasubur
└  ◦zodiak
    
 untuk penggunaan nya Silakan Ketik Salah Satu List Tersebut Contoh
 *.artinama* _ _ _ `)
 
    setReply(teks)
    
    }
    
handler.help = ["listprimbon"];
handler.tags = ["primbon"];
handler.command = ["listprimbon"];

module.exports = handler;
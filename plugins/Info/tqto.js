
        
        
        
const handler = async (m, { hanz,sendThumb, command, prefix }) => {
    // The text that will be sent as the thank you message
    let teksTqto = `${thanksto(prefix)}`;
    
    // Send a thumb image with the thank you message
    sendThumb('https://pomf2.lain.la/f/o4gnkwqm.jpg', teksTqto, m);
};

// Command setup
handler.help = ['tqto', 'thanksto'];
handler.tags = ['tools'];
handler.command = /^(tqto|thanksto)$/i;

module.exports = handler;

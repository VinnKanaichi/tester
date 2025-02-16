const fs = require("fs-extra");
const toMs = require("ms");

const cmdAdd = function (run, time, _db) {
  let position = false;
  Object.keys(_db).forEach((i) => {
    if (_db[i].id === run) {
      position = i;
    }
  });
  if (position !== false) {
    _db[position].totalcmd += 1;
  } else {
    const bulin = {
      id: run,
      expired: Date.now() + toMs(time),
      totalcmd: 1,
    };
    _db.push(bulin);
  }
};

const readLogs = function () {
  try {
    const data = fs.readFileSync('./database/logs.json');
    return JSON.parse(data); // Parsing file sebagai JSON
  } catch (error) {
    return [];
  }
};

const expiredCmd = function (_dir, _db) {
  setInterval(() => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].expired && _dir[i].id === "run") {
        position = i;
      }
    });
    if (position !== null) {
      if (_db.length !== 0) {
        console.log(`Total hit telah di reset`);
        _db.length = 0;
        _dir.splice(position, 1);
        const data = global.db.data.chats;
        for (let key in data) {
          if (data[key].hasOwnProperty("hit")) {
            data[key].hit = 0;
          }
        }
      }
    }
  }, 2000);
};

const getHit = function (run, _db) {
  let position = false;
  Object.keys(_db).forEach((i) => {
    if (_db[i].id === run) {
      position = i;
    }
  });
  if (position !== false) {
    return _db[position].totalcmd;
  }
};

const addAutoClear = async function (m, waktu, _dir) {
  if (m.sender !== m.key.remoteJid) return;
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].key.remoteJid === m.sender) {
      position = i;
    }
  });
  if (position !== null) {
    _dir[position].key = m.key;
    _dir[position].messageTimestamp = m.messageTimestamp;
  } else {
    if (m.fromMe) return;
    const obj = {
      id: m.sender,
      key: m.key,
      messageTimestamp: m.messageTimestamp,
      expired: Date.now() + toMs(waktu),
    };
    _dir.push(obj);
  }
};

const autoClearChat = async function (conn, _dir) {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (Date.now() >= _dir[i].expired) {
      position = i;
    }
  });
  if (position !== null) {
    await conn.chatModify(
      {
        delete: true,
        lastMessages: [
          {
            key: _dir[position].key,
            messageTimestamp: _dir[position].messageTimestamp,
          },
        ],
      },
      _dir[position].id
    );
    await _dir.splice(position, 1);
    console.log("Sukses clear chat");
  }
};

const checkAutoClear = function (namenya, claim) {
  let status = false;
  Object.keys(claim).forEach((i) => {
    if (claim[i].id === namenya) {
      status = true;
    }
  });
  return status;
};

const createDataId = function (nama, _level) {
  const obj = { name: nama, id: [] };
  _level.push(obj);
};

const getDataId = function (nama, _db) {
  let position = false;
  Object.keys(_db).forEach((i) => {
    if (_db[i].name === nama) {
      position = i;
    }
  });
  if (position !== false) {
    return _db[position].id;
  }
};

const addDataId = function (idgc, nama, _db) {
  let found = false;
  Object.keys(_db).forEach((i) => {
    if (_db[i].name === nama) {
      found = i;
    }
  });
  if (found !== false) {
    _db[found].id.push(idgc);
  }
};

const removeDataId = function (nama, idgc, _db) {
  let found = false;
  Object.keys(_db).forEach((i) => {
    if (_db[i].name === nama) {
      found = i;
    }
  });
  if (found !== false) {
    _db[found].id.splice(_db[found].id.indexOf(idgc), 1);
  }
};

const checkDataId = function (nama, idgc, _db) {
  let found = false;
  let status = false;
  Object.keys(_db).forEach((i) => {
    if (_db[i].name === nama) {
      found = i;
    }
  });
  if (found !== false) {
    for (let indexs of _db[found].id) {
      if (indexs === idgc) {
        status = true;
      }
    }
  }
  return status;
};

const checkDataName = function (nama, idgc, claim) {
  let status = false;
  Object.keys(claim).forEach((i) => {
    if (claim[i].name === nama) {
      status = true;
    }
  });
  return status;
};

const Succes = function (cmd, _db, allcommand) {
  if (!allcommand.includes(cmd)) {
    allcommand.push(cmd);
  }

  let position = false;
  Object.keys(_db).forEach((i) => {
    if (_db[i].cmd === cmd) {
      position = i;
    }
  });
  if (position !== false) {
    _db[position].succes += 1;
  } else {
    const bulin = {
      cmd: cmd,
      succes: 1,
      failed: 0,
    };
    _db.push(bulin);
  }
};

const Failed = function (cmd, _db) {
  let position = false;
  Object.keys(_db).forEach((i) => {
    if (_db[i].cmd === cmd) {
      position = i;
    }
  });
  if (position !== false) {
    _db[position].succes -= 1;
    _db[position].failed += 1;
  } else {
    const bulin = {
      cmd: cmd,
      succes: 0,
      failed: 1,
    };
    _db.push(bulin);
  }
};

const Nothing = function (cmd, _db, allcommand) {
  allcommand.splice(allcommand.indexOf(cmd), 1);

  Object.keys(_db).forEach((i) => {
    if (_db[i].cmd === cmd) {
      _db.splice(i, 1);
    }
  });
  return true;
};

module.exports = {
  Nothing,
  Failed,
  Succes,
  checkDataName,
  createDataId,
  addDataId,
  removeDataId,
  checkDataId,
  getHit,
  cmdAdd,
  expiredCmd,
};


/*exports.getHit = function(run, _db){
    let position = false
    
exports.autoClearChat = async (conn,_dir) => {

    })

    return status
}






//FITUR KEAMANAN UNTUK BOT
exports.createDataId= (nama,_level) => {                                                                                                                      
 obj = { name: nama, id: [] }
_level.push(obj)
//fs.writeFileSync('./database/data.json', JSON.stringify(_level))
}




exports.getDataId = function(nama, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].name === nama) {
            position = i
        }
    })
    if (position !== false) {
        return _db[position].id
    }
}


exports.addDataId = function(idgc, nama, _db){
    var found = false;
    Object.keys(_db).forEach((i) => {
        if(_db[i].name == nama){
            found = i
        }
    })
    if (found !== false) {
        _db[found].id.push(idgc)
        //fs.writeFileSync('./database/data.json',JSON.stringify(_db));
    }
}


exports.removeDataId = function(nama, idgc, _db){
    var found = false;
    Object.keys(_db).forEach((i) => {
        if(_db[i].name == nama){
            found = i
        }
    })
    if (found !== false) {
       // _db[found].id.splice(idgc, 1)
      _db[found].id.splice(_db[found].id.indexOf(idgc, 1))
        //fs.writeFileSync('./database/data.json',JSON.stringify(_db));
    }
}



exports.checkDataId = function(nama, idgc, _db){
  
    var found = false;
    var status = false
    Object.keys(_db).forEach((i) => {
        if(_db[i].name == nama){
            found = i
        }
    })
    if (found !== false) {
     for (let indexs of  _db[found].id){
     if( indexs == idgc){
     	status = true
     }
        }
    }
    return status
}



exports.checkDataName = function(nama, idgc, claim) {
    let status = false
    Object.keys(claim).forEach((i) => {
        if (claim[i].name === nama) {
            status = true
        }
    })
return status
}



exports.Succes = function(cmd, _db, allcommand){


   let index = false
  for (let i of allcommand){
    if(i == cmd){
      index = true
    }
  }
  
  if(index == false){
  allcommand.push(cmd)
  //fs.writeFileSync('./database/allcommand.json', JSON.stringify(allcommand))
  }
       
        
    
	
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].cmd === cmd) {
            position = i
          
        }
    })
    if (position !== false) {
        _db[position].succes += 1
        //fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))
    } else {
        const bulin = ({
            cmd: cmd,
            succes: 1,
            failed: 0
                })
        _db.push(bulin)
        //fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))

    }
}

exports.Failed = function(cmd, _db){
    let position = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].cmd === cmd) {
            position = i
        }
    })
    if (position !== false) {
        _db[position].succes -= 1
        _db[position].failed += 1
        //fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))
    } else {
        const bulin = ({
            cmd: cmd,
            succes: 0,
            failed: 1
                })
        _db.push(bulin)
        //fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))
    }
} 


exports.Nothing = function(cmd, _db, allcommand){
	allcommand.splice(allcommand.indexOf(cmd), 1)
  //s.writeFileSync('./database/allcommand.json', JSON.stringify(allcommand))
	
    Object.keys(_db).forEach((i) => {
        if (_db[i].cmd === cmd) {
            _db.splice(i, 1)
           // fs.writeFileSync('./database/dashboard.json', JSON.stringify(_db))
        }
    })
return true
}
*/


const { color } = require("../lib/color");
const chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})







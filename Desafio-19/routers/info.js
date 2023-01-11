 

const express = require('express')  
const os = require('os')  

const router = express.Router();
    
  
router.get('/', (req, res) => {  

  //console.log(`Directorio actual de trabajo: ${process.cwd()}`);
  //console.log(`Id del proceso: ${process.pid}`);
  //console.log(`Version de Node: ${process.version}`);
  //console.log(`Titulo del proceso: ${process.title}`);
  //console.log(`Sistema operativo: ${process.platform}`);
  //console.log(`Directorio de ejecución: ${process.execPath}`);
  //console.log(`Uso de de la memoria - rss: ${JSON.stringify(process.memoryUsage()['rss'], null, 2)}`);
  
  let data = {
    currentDir: process.cwd(),
    idProc: process.pid,
    vNode: process.version,
    titleProc: process.title,
    os: process.platform,
    execPath: process.execPath,
    memortRss: JSON.stringify(process.memoryUsage()['rss'] ),
    argv: process.argv, 
    nrocpu: os.cpus().length

  }

  console.log(data)
  res.render('info',data )

})
 

module.exports = router;

import {Router} from "express";
import multer from "multer";
import path from "path";
import sql from "mssql"
import configbd from "../dbconfig.js"

const routertrackingdetSegucity = Router()
const rootfsid = '\\\\vm-proyectfile\\Infoencsatisfaccion2024Xml\\2024\\TRACKDETAIL\\';


const fileStorageEnginedetSegucity = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./datatrackingdetail"); 
    },
    filename: (req, file, cb) => {
      //cb(null, Date.now() + "--" + file.originalname);
      cb(null,file.originalname);
    },
  });
  

  routertrackingdetSegucity.get("/lecturatrackdetsalud", (req, res) => {
    //res.sendFile(path.join(__dirname, ""));
  });
  

  const upload = multer({ 
    storage: fileStorageEnginedetSegucity, 
    limits: {fileSize: 9000000}/*,
    fileFilter (req, file, cb) {
       
       const filetypes = /zip/;
       const mimetype = filetypes.test(file.mimetype);
       const extname = filetypes.test(path.extname(file.originalname));
        console.log(mimetype);
        console.log(extname);
        console.log(file.mimetype);
       if(mimetype && extname){
            return cb(null, true);
       }      
       
        cb(new Error('Error: Archivo debe ser un ZIP valido'))

             
      
      }*/
 });
  
 
  routertrackingdetSegucity.post("/fstrackingdetsinglesegucity", upload.single("uploaded_file"), (req, res) => {
    console.log(req.file);
    res.send("Single tracking Detail listo Seguridad Ciudadana");
  });
  
  
  routertrackingdetSegucity.post("/fstrackingdetmultiplesegucity", upload.array("uploaded_file", 10),async (req, res) => {
    console.log(req.files);
    console.log(req.body.modoenvio);
    console.log(req.body.indexrural);
    console.log(req.body.evaluador);
    console.log(req.files[0].originalname);
   
    let modoenvio = (typeof req.body.modoenvio !== 'undefined') ? req.body.modoenvio : (typeof req.body.modoenvio === 'undefined') ? null : req.body.modoenvio;
    let indexrural = (typeof req.body.indexrural !== 'undefined') ? req.body.indexrural : (typeof req.body.indexrural === 'undefined') ? null : req.body.indexrural;
    let evaluador = (typeof req.body.evaluador !== 'undefined') ? req.body.evaluador : (typeof req.body.evaluador === 'undefined') ? null : req.body.evaluador;
    let namefileori = (typeof req.files[0].originalname !== 'undefined') ? req.files[0].originalname : (typeof req.files[0].originalname === 'undefined') ? null : req.files[0].originalname;
    let rootfsz = rootfsid + namefileori;
    console.log(modoenvio);
    console.log(indexrural);
    console.log(evaluador);
    console.log(rootfsid);
    console.log(namefileori);
    console.log(rootfsz);

    let dat = await savetrackingdetmobilesegucity(rootfsz,rootfsid,namefileori,indexrural,evaluador,modoenvio);
    console.log(dat);

    res.status(200).json({mensaje : "Multiple tracking Detail Seguridad Ciudadana"});
  });

  export async function savetrackingdetmobilesegucity(wrootfsz,wrootfsid,wnamefileori,windexrural,wevaluador,wmodoenvio) {
    try {
        console.log('Entreeee savetrackingdetmobile Seguridad Ciudadana');   

            let pool = await sql.connect(configbd);
            let uptrackunique = await pool.request()
            .input('rutazip', sql.VarChar, wrootfsz)
            .input('roottrack01', sql.VarChar, wrootfsid)
            .input('nombrexmldata', sql.VarChar, wnamefileori)
            .input('indicesxmldata', sql.VarChar, windexrural)
            .input('evaluador', sql.VarChar, wevaluador)
            .input('modoenvio', sql.VarChar, wmodoenvio)                
            .execute(`USP_TRANSFER_DATATABLET_AUDITAGLOBAL02_ALLDETAIL_SEG_CIUDADANA2024`);  
        
        console.dir(uptrackunique)

        return uptrackunique.recordsets[0];
       
    } catch (error) {
        let data = {};       
        data.estado=error;
        console.log(error);
        return data;
    }
  }


  export default routertrackingdetSegucity;
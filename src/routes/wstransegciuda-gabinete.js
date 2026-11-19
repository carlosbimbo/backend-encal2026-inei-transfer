import {Router} from "express";
import multer from "multer";
import path from "path";
import sql from "mssql"
import configbd from "../dbconfig.js"

const routertransegu_gabinete = Router()
const rootfsid = '\\\\vm-proyectfile\\Infoencsatisfaccion2024Xml\\';

const fileStorageEnginesegugabi = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./dataxml"); 
    },
    filename: (req, file, cb) => {
      //cb(null, Date.now() + "--" + file.originalname);
      cb(null,file.originalname);
    },
  });
  

  routertransegu_gabinete.get("/lecturafssegugabinete", (req, res) => {
    //res.sendFile(path.join(__dirname, ""));
  });
  

  const upload = multer({ 
    storage: fileStorageEnginesegugabi, 
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
  
 
  routertransegu_gabinete.post("/fsupsinglesegugabinete", upload.single("uploaded_file"), (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success seguridad Gabinete");
  });
  
  
  routertransegu_gabinete.post("/fsupmultitransfersegugabinete", upload.array("uploaded_file", 10), async (req, res) => {
    console.log(req.files);
    console.log(req.body.modoenvio);
    console.log(req.body.indexrural);
    console.log(req.body.evaluador);
    console.log(req.files[0].originalname);
   
    let modoenvio = (typeof req.body.modoenvio !== 'undefined') ? req.body.modoenvio : (typeof req.body.modoenvio === 'undefined') ? null : req.body.modoenvio;
    let indexrural = (typeof req.body.indexrural !== 'undefined') ? req.body.indexrural : (typeof req.body.indexrural === 'undefined') ? null : req.body.indexrural;
    let evaluador = (typeof req.body.evaluador !== 'undefined') ? req.body.evaluador : (typeof req.body.evaluador === 'undefined') ? null : req.body.evaluador;
    let namefileori = (typeof req.files[0].originalname !== 'undefined') ? req.files[0].originalname : (typeof req.files[0].originalname === 'undefined') ? null : req.files[0].originalname;
    let rootfsz = rootfsid + '\\ZipData\\' + namefileori;
    let rootorizip = rootfsid + '\\ZipData\\';
    console.log(modoenvio);
    console.log(indexrural);
    console.log(evaluador);
    console.log(rootfsid);
    console.log(namefileori);
    console.log(rootfsz);

    let dat = await savetrafertomobilesegugabinete(rootfsz,rootorizip,rootfsid,namefileori,'',evaluador,modoenvio);
    console.log(dat);

    res.status(200).json({mensaje : "Multiple fs data transfer success seguridad Gabinete"});
  });

  export async function savetrafertomobilesegugabinete(wrootfsz,wrootorizip,wrootfsid,wnamefileori,wkey,wevaluador,wmodoenvio) {
    try {
        console.log('Entre savetrafertomobile seguridad Gabinete');   

            let pool = await sql.connect(configbd);
            let upktransfer = await pool.request()
            .input('rutazip', sql.VarChar, wrootfsz)
            .input('rutadest', sql.VarChar, wrootorizip)
            .input('rutadestfinal', sql.VarChar, wrootfsid)
            .input('zipdataname', sql.VarChar, wnamefileori)
            .input('lanpass', sql.VarChar, wkey)
            .input('evaluador', sql.VarChar, wevaluador)                
            .input('modoenvio', sql.VarChar, wmodoenvio)
            .execute(`USP_TRANSDATA_IMPROVE_SEGCIUD2026_GABINETE`);  
        
        console.dir(upktransfer)

        return upktransfer.recordsets[0];
       
    } catch (error) {
        let data = {};       
        data.estado=error;
        console.log(error);
        return data;
    }
  }


  export default routertransegu_gabinete;
import jwt from 'jsonwebtoken';
import {Router} from "express";
import sql from "mssql"
import cors from "cors";
import configbd from "../dbconfig.js"

const routerusers = Router()

routerusers.get('/users', verifyToken,(req,res)=>{
   
    //////
    jwt.verify(req.token, process.env.TOKEN_PROJ,async (error, authData) => {
     console.log(error);
     if(error){
         //res.sendStatus(403);
         res.json({mensaje : "no trajo users"})
     }else{         
        let dat = await sendingusers();
        res.json(dat); 
         }
     });
    //////   
 
 })

 routerusers.get('/authper/:user/:pass', verifyToken,(req,res)=>{
   
    //////
    jwt.verify(req.token, process.env.TOKEN_PROJ,async (error, authData) => {
     console.log(error);

     if(error){

         res.json({mensaje : "no trajo auths"})
     }else{      
    
       let guser = req.params.user;
       let gpass = req.params.pass;    

        let dat = await authlogin(guser,gpass);
        res.json(dat); 
         }
     });
    //////   
 
 })

export async function sendingusers() {
    try {
        console.log('Entreeee sendingusers');   

            let pool = await sql.connect(configbd);
            let upfront = await pool.request()                
            .execute(`USP_AUTH_USERLOGIN01`);  
        
        console.dir(upfront)

        return upfront.recordsets[0];
       
    } catch (error) {
        let data = {};       
        data.estado=error;
        console.log(error);
        return data;
    }
  }

  routerusers.post("/login", (req , res) => {
    const user = {
        id: 1,
        nombre : "Carlos barrientos",
        email: "carlosbars8@gmail.com"
    }  

    jwt.sign({user}, process.env.TOKEN_PROJ, (err, token) => {
        res.json({
            token
        });
    });

});

routerusers.get('/login/:user/:pass/:idpj',async(req,res)=>{    
    
       let guser = req.params.user;
       let gpass = req.params.pass;    
       let gidpj = req.params.idpj;

        let dat = await authlogin(guser,gpass,gidpj);
        res.json(dat); 
   
 
 })

export async function authlogin(user,pass,idpj) {
    try {
        console.log('ENTRE AUTH  OKasss la Edu'); 
        console.log(user);
        console.log(pass);  
        console.log(idpj);

            let pool = await sql.connect(configbd);
            let authlo = await pool.request()
            .input('USUARIO', sql.VarChar, user)
            .input('PASSWORD', sql.VarChar, pass)                
            .input('IDPJ', sql.Int, idpj) 
            .execute(`SP_AUTH_LOGIN_USER_01`);  
        
        console.dir(authlo)

        return authlo.recordsets[0];
       
    } catch (error) {
        let data = {};       
        data.estado=error;
        console.log(error);
        return data;
    }
  }


function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
         const bearerToken = bearerHeader.split(" ")[1];
         req.token  = bearerToken;
         next();
    }else{
        res.sendStatus(403);        
    }
}

routerusers.get('/loginvisita/:user/:pass/:idpj',async(req,res)=>{    
    
    let guser = req.params.user;
    let gpass = req.params.pass;    
    let gidpj = req.params.idpj;

     let dat = await authloginvisita(guser,gpass,gidpj);
     res.json(dat); 


})

export async function authloginvisita(user,pass,idpj) {
    try {
        console.log('ENTRE AUTH  OKasss visitas'); 
        console.log(user);
        console.log(pass);  
        console.log(idpj);

            let pool = await sql.connect(configbd);
            let authlo = await pool.request()
            .input('USUARIO', sql.VarChar, user)
            .input('PASSWORD', sql.VarChar, pass)                
            .input('IDPJ', sql.Int, idpj) 
            .execute(`SP_AUTH_LOGIN_USER_01`);  
        
        console.dir(authlo)

        return authlo.recordsets[0];
       
    } catch (error) {
        let data = {};       
        data.estado=error;
        console.log(error);
        return data;
    }
  }

  //add 09072024

  routerusers.get('/logintpi/:user/:pass/:idpj',async(req,res)=>{    
    
    let guser = req.params.user;
    let gpass = req.params.pass;    
    let gidpj = req.params.idpj;

     let dat = await authlogintpi(guser,gpass,gidpj);
     res.json(dat); 


})

export async function authlogintpi(user,pass,idpj) {
    try {
        console.log('ENTRE AUTH  OKasss tpi'); 
        console.log(user);
        console.log(pass);  
        console.log(idpj);

            let pool = await sql.connect(configbd);
            let authlo = await pool.request()
            .input('USUARIO', sql.VarChar, user)
            .input('PASSWORD', sql.VarChar, pass)                
            .input('IDPJ', sql.Int, idpj) 
            .execute(`SP_AUTH_LOGIN_USER_01`);  
        
        console.dir(authlo)

        return authlo.recordsets[0];
       
    } catch (error) {
        let data = {};       
        data.estado=error;
        console.log(error);
        return data;
    }
  }

  //lamax

    //add 01082025

  routerusers.get('/logindiu/:user/:pass/:idpj',async(req,res)=>{    
    
    let guser = req.params.user;
    let gpass = req.params.pass;    
    let gidpj = req.params.idpj;

     let dat = await authlogindiu(guser,gpass,gidpj);
     res.json(dat); 


})

export async function authlogindiu(user,pass,idpj) {
    try {
        console.log('ENTRE AUTH  OKasss diu'); 
        console.log(user);
        console.log(pass);  
        console.log(idpj);

            let pool = await sql.connect(configbd);
            let authlo = await pool.request()
            .input('USUARIO', sql.VarChar, user)
            .input('PASSWORD', sql.VarChar, pass)                
            .input('IDPJ', sql.Int, idpj) 
            .execute(`SP_AUTH_LOGIN_USER_01`);  
        
        console.dir(authlo)

        return authlo.recordsets[0];
       
    } catch (error) {
        let data = {};       
        data.estado=error;
        console.log(error);
        return data;
    }
  }

  //labarri
export default routerusers;
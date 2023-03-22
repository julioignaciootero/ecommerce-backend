import express from "express";
import  routerUser  from "./users.js"
import { fork } from 'child_process';
import path from 'path'
import {fileURLToPath} from 'url';
import compression from 'compression';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { logger } from "../config/logs.js";
import  routerProducto  from "./productos.js"
import  routerCarrito  from "./carritos.js"


const scriptPath = path.resolve(__dirname, '../utils/randoms.js');


const router = express.Router()

router.use("/user", routerUser)

router.use("/error" , (req, res) => {

    try {
        errorcito = er
    } catch (error) {
        logger.error(error)
    }
    

})

router.get("/info", (req, res)=>{              //localhost:8080/api/info

    try {
        logger.info(`Info normal llamada desde: ${req.url}`);

        res.status(200).json({
            
            argumentos: process.argv,
            plataforma: process.platform,
            version: process.version,
            path: process.execPath,
            carpeta: process.cwd(),
            id_proceso: process.pid,
            memoria : process.memoryUsage()
    
    
    
        })
        
    } catch (error) {
        logger.error(error)
    }

})

router.get("/infozip", compression(), (req, res)=>{              //localhost:8080/api/info

    logger.info(`Informacion Zip :  ${req.url}` );

    try {
        res.status(200).json({
        
            argumentos: process.argv,
            plataforma: process.platform,
            version: process.version,
            path: process.execPath,
            carpeta: process.cwd(),
            id_proceso: process.pid,
            memoria : process.memoryUsage()
    
    
    
        })
    } catch (error) {
        logger.error(error)
    }

})

router.get("/randoms", (req, res) => {

    logger.info("Numeros random generados")

    try {
        const cant = parseInt(req.query.cant) || 1000000000
        const min = 0
        const max = 1000
        let numeros = {}
        const opt = {
            message: "start",
            max,
            min,
            cant
        }
    
        const computo = fork(scriptPath )
        // computo.send('message', cant)
        computo.send(opt)
        computo.on('message' , (numeros) => {
            res.status(200).json({
                msg: `Numeros aleatorios generados entre ${min} y ${max}`,
                numeros
            })
        })
    } catch (error) {
        logger.error(error)
    }

    // const cant = parseInt(req.query.cant) || 100000000


    // for(let i = 0; i < cant; i++) {

    //     const random = Math.floor(Math.random() * (max - min) + min)
        
    //     if (numeros[random]) {
            
    //         numeros[random] = numeros[random] + 1

    //     } else {

    //         numeros[random] = 1

    //     }



    // } 



})


router.use("/productos", routerProducto)
router.use("/carritos", routerCarrito)

export default router
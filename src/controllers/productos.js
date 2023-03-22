import {prodcutModel} from "../models/productos.js";
import { logger } from "../config/logs.js";
// import express, { Request, Response, NextFunction } from "express";

import { saveProduct, getAllProducts } from "../services/products.js";
export const saveController = async (req, res) => {
    const { body } = req;
    try {
        const product = await saveProduct(body);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}

export const getAllController = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}
export const checkBodyProducto = async ( req ,  res , next) => {
    
    const { nombre , descripcion, codigo, foto, precio, stock } = req.body
    
    if (!nombre || !descripcion || !precio || !codigo) {

        return res.status(400).json({
            ok: false,
            msg: "Por favor complete todos los datos"
        })
        
    }
    next();
}


export const createProdcuto = async(req, res)=> {
    
    
    try {
    
        const { nombre , descripcion, codigo, foto, precio, stock } = req.body
        
        
        const prodNuevo = await prodcutModel.create({
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        })

        return res.status(200).json({
            ok: true,
            msg: "Producto creado",
            producto: prodNuevo

        })

    } catch (error ) {
        logger.error(error)
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const deleteProdcuto = async (req, res) => {
    
    const { id } = req.params;
    
    try {
    
        const encontrado = await prodcutModel.findById(id)
        
        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Id No encontrado",
    
            })
 
        } else {



            await prodcutModel.findByIdAndDelete(id)
            return res.status(200).json({
                ok: true,
                msg: "Producto eliminado"
    
            })

        }


    } catch (error ) {
        logger.error(error)
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const modificarProducto = async(req, res) => {

    const { id } = req.params;
    try {
        
        const encontrado = await prodcutModel.findById(id)
       
        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Id No encontrado",
    
            })
 
        } else {

            const { nombre , descripcion, codigo, foto, precio, stock } = req.body
            const modificado = await prodcutModel.findByIdAndUpdate(
                id,
                { nombre, descripcion, codigo, foto, precio, stock},
                {new : true}
            )
            return res.status(200).json({
                ok: true,
                msg: "Producto modificado"
    
            })

        }


        

    } catch (error) {
        logger.error(error)
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const getProducto = async (req, res) => {

    const { id } = req.params;
    try {
        
        const encontrado = await prodcutModel.findById(id)
        
        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Id No encontrado",
    
            })
 
        } else {

            
            return res.status(200).json({
                ok: true,
                msg: "Producto ecnontrado",
                producto : encontrado
    
            })

        }


        

    } catch (error) {
        logger.error(error)
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const getAllProductos = async (req, res) => {

    try {

        const productos = await prodcutModel.find()
        if (!productos) {
            return res.status(400).json({
                ok: false,
                msg: "No se encontraron productos",
    
            })
        } else {
            return res.status(200).json({
                ok: true,
                msg: "Productos ecnontrados",
                productos : productos
    
            })
        }
        
    } catch (error) {
        logger.error(error)
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}
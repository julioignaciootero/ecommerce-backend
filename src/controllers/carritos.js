import { carritoModel } from "../models/carritos.js";
import { prodcutModel } from "../models/productos.js";
import { logger } from "../config/logs.js";
import { getAllCarritos } from "../services/carritos.js";
import mongoose from "mongoose";

//Verificamos los datos del carrito
export const checkBodyCarrito = async (req, res, next) => {
  const { productos } = req.body;

  if (!productos) {
    return res.status(400).json({
      ok: false,
      msg: "Por favor complete todos los datos",
    });
  }
  next();
};

//Eliminar producto segun el ID pasado por parametro
export const deleteProducto = async (req, res) => {
  const id = req.params.id;
  const id_prod = req.params.id_prod;
  const id_prod_object = new mongoose.mongo.ObjectId(id_prod);

  try {
    const encontrado = await carritoModel.findById(id);

    if (!encontrado) {
      return res.status(400).json({
        ok: false,
        msg: "Carrito No encontrado",
      });
    } else {
      const prod = encontrado.productos.find(
        (p) => JSON.stringify(p.producto) === JSON.stringify(id_prod_object)
      );

      if (prod) {
        //Borramos el producto del array
        await carritoModel.findByIdAndUpdate(id, {
          $pullAll: {
            productos: [{ producto: id_prod_object }],
          },
        });

        //Si se elimino el producto le vuelvo a generar el stock al producto
        const stockUpd = await updateStock(prod.producto, prod.cantidad, true);
        logger.info("Producto eliminado");
        return res.status(200).json({
          ok: false,
          msg: "Producto eliminado",
        });
      } else {
        return res.status(400).json({
          ok: false,
          msg: "Producto No encontrado",
        });
      }
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

//Crear el carrito con el array de productos
export const createCarrito = async (req, res) => {
  try {
    const { productos } = req.body;

    const carritoNuevo = await carritoModel.create({
      productos: productos,
    });

    logger.info("Carrito Creado");
    return res.status(200).json({
      ok: true,
      msg: "Carrito creado",
      producto: carritoNuevo,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

//Borramos el carrito indicado en el parametro
export const deleteCarrito = async (req, res) => {
  const { id } = req.params;

  try {
    const encontrado = await carritoModel.findById(id);

    if (!encontrado) {
      return res.status(400).json({
        ok: false,
        msg: "Carrito No encontrado",
      });
    } else {
      //Si eliminamos el carrito es necesario volver a cargar el stock de los productos
      encontrado.productos.forEach((prod) => {
        const stockUpd = updateStock(prod.producto, prod.cantidad, true);
      });

      await carritoModel.findByIdAndDelete(id);
      logger.info("Carrito eliminado");
      return res.status(200).json({
        ok: true,
        msg: "Carrito eliminado",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

//Funcion para actualizar Stock, al crear o borrar carrito
export const updateStock = async (id, cantidad, sumar) => {
  try {
    const prod = await prodcutModel.findById(id);
    if (!prod) {
      return false;
    } else {
      if (sumar) {
        prod.stock = prod.stock + cantidad;
      } else {
        prod.stock = prod.stock - cantidad;
      }

      await prodcutModel.findByIdAndUpdate(prod.id, prod);
      return true;
    }
  } catch (error) {
    logger.error(error);
    return false;
  }
};

//Agregar al carrito el prodicto.
//El carrito llega por ID y el producto por Body
export const agregarProducto = async (req, res) => {
  const id = req.params.id;
  if (!req.body.producto || !req.body.cantidad)
    res.status(400).json({
      ok: false,
      msg: "Error. Datos incompletos",
    });

  try {
    const encontrado = await carritoModel.findById(id);

    if (!encontrado) {
      return res.status(400).json({
        ok: false,
        msg: "Carrito No encontrado",
      });
    } else {
      const id_prod = req.body.producto;
      const cantidad = req.body.cantidad;

      const prod = await prodcutModel.findById(id_prod);
      if (!prod) {
        return res.status(400).json({
          ok: false,
          msg: "Producto No encontrado",
        });
      } else {
        if (cantidad > prod.stock) {
          return res.status(400).json({
            ok: false,
            msg: "Stock no disponible",
          });
        }
        const carrito = await carritoModel.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              productos: {
                producto: id_prod,
                cantidad: cantidad,
              },
            },
          },
          { new: true }
        );

        prod.stock = prod.stock - cantidad;
        await prodcutModel.findByIdAndUpdate(id_prod, prod);
        logger.info("Producto agregado");
        return res.status(200).json({
          ok: true,
          msg: "Producto Agregado",
          carrito: carrito,
        });
      }
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

//Obtener el carrito
export const getCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    const encontrado = await carritoModel.findById(id);

    if (!encontrado) {
      return res.status(400).json({
        ok: false,
        msg: "Carrito no encontrado",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "Carrito ecnontrado",
        producto: encontrado,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

//Obtener todos los carritos
export const getAll = async (req, res) => {
  try {
    const carritos = await getAllCarritos();
    if (!carritos) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontraron carritos",
      });
    } else {
      return res.status(200).json({
        ok: true,
        msg: "carritos ecnontrados",
        carritos: carritos,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

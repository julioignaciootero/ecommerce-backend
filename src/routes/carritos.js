import express from 'express'
import {
  checkBodyCarrito,
  createCarrito,
  deleteCarrito,
  agregarProducto,
  deleteProducto,
  getAllCarritos,
  getCarrito
} from '../controllers/carritos.js'
const router = express.Router()





router.post('/', checkBodyCarrito, createCarrito);
router.delete('/:id', deleteCarrito);

router.delete('/:id/productos/:id_prod', deleteProducto)
router.post('/:id/productos', agregarProducto)
router.get('/:id', getCarrito);
router.get('/', getAllCarritos);


export default router
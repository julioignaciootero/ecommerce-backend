import express from "express";
import {
  checkBodyCarrito,
  createCarrito,
  deleteCarrito,
  agregarProducto,
  deleteProducto,
  getAll,
  getCarrito,
} from "../controllers/carritos.js";
const router = express.Router();

router.post("/", checkBodyCarrito, createCarrito);
router.delete("/:id", deleteCarrito);

router.delete("/:id/productos/:id_prod", deleteProducto);
router.put("/:id/productos", agregarProducto);
router.get("/:id", getCarrito);
router.get("/", getAll);

export default router;

// import express, { Request, Response, NextFunction } from "express";
import express from "express";
import {
  checkBodyProducto,
  deleteProdcuto,
  modificarProducto,
  getProducto,
  saveController,
  getAllController,
} from "../controllers/productos.js";
const router = express.Router();

// router.post("/add", saveController);
// router.get("/list", getAllController);

router.post("/", checkBodyProducto, saveController);
router.delete("/:id", deleteProdcuto);
router.put("/:id", checkBodyProducto, modificarProducto);
router.get("/:id", getProducto);
router.get("/", getAllController);

export default router;

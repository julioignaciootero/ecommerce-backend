import File from "./dao-filesystem/filesystem.js";
import Memory from "./dao-memory/memory.js";
import MongoDB from "./dao-mongodb/mongo.js";
import { initDB } from "../db/db.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { prodcutosSchema } from "../models/productos.js";
import { logger } from "../config/logs.js";
let persistence;
let option = process.env.PERSISTENCE;
let carritoHanlder;
let productoHanlder;

let dao;
switch (option) {
  case "file":
    const productPath = path.resolve(
      __dirname,
      "../daos/dao-filesystem/productos.json"
    );
    dao = new File(productPath);

    logger.info(`Metodo de persistencia: ${option}`);
    break;
  case "mongo":
    productoHanlder = new MongoDB("productos");
    carritoHanlder = new MongoDB("carritos");
    initDB();
    logger.info(`Metodo de persistencia: ${option}`);
    break;
  default:
    dao = new Memory();
    break;
}

export async function save(collection, obj) {
  switch (collection) {
    case "productos":
      return await productoHanlder.getAll();
      break;
    case "carritos":
      return await carritoHanlder.getAll();
      break;
    default:
      break;
  }

  // return await dao.save(obj);
}

export async function getAll(collection) {
  // return await dao.getAll(collection);
  switch (collection) {
    case "productos":
      return await productoHanlder.getAll();
      break;
    case "carritos":
      return await carritoHanlder.getAll();
      break;
    default:
      break;
  }
}

export function getProdDao() {
  return productoHanlder;
}

export function getCarritoDao() {
  return carritoHanlder;
}

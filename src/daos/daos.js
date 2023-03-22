import File from "./dao-filesystem/filesystem.js";
import Memory from "./dao-memory/memory.js";
import MongoDB from "./dao-mongodb/mongo.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { prodcutModel } from "../models/productos.js";
let persistence;
let option = process.env.PERSISTENCE;
// 17-Capas II\src\daos\dao-filesystem\productos.json
let dao;
switch (option) {
  case "file":
    const productPath = path.resolve(
      __dirname,
      "../daos/dao-filesystem/productos.json"
    );
    dao = new File(productPath);
    console.log(option);
    break;
  case "mongo":
    dao = new MongoDB("products", prodcutModel);
    dao.initMongoDB();
    console.log(option);
    break;
  default:
    dao = new Memory();
    break;
}

export async function save(obj) {
  return await dao.save(obj);
}

export async function getAll() {
  return await dao.getAll();
}

export function getDao() {
  return dao;
}

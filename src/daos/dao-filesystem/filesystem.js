import fs from "fs";
import { logger } from "../../config/logs.js";
const pathaux = "./src/daos/dao-filesystem/productos.json";

//Dao para guardar en archivo los productos
export default class File {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const list = await fs.promises.readFile(this.path, "utf-8");
        return asDto(JSON.parse(list));
      } else {
        logger.error(`No existent file ${this.path}`);
        return [];
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async save(obj) {
    try {
      const productos = await this.getAll();
      productos.push(obj);
      await fs.promises.writeFile(this.path, JSON.stringify(productos));
      return obj;
    } catch (error) {
      logger.error(error);
    }
  }
}

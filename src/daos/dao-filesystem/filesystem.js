import fs from "fs";
import ProductsDTO, { asDto } from "../../dto/productos.js";
const pathaux = "./src/daos/dao-filesystem/productos.json";

export default class File {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const list = await fs.promises.readFile(this.path, "utf-8");
        // console.log(list);
        return asDto(JSON.parse(list));
        // return JSON.parse(list);
      } else {
        console.log(`No existent file ${this.path}`);
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async save(obj) {
    try {
      const products = await this.getAll();
      products.push(obj);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return obj;
    } catch (error) {
      console.log(error);
    }
  }
}

// export const getAll = async () => {
//   try {
//     if (fs.existsSync(path)) {
//       const list = await fs.promises.readFile(path, "utf-8");
//       console.log(list);
//       return JSON.parse(list);
//     } else {
//       console.log("No existent file");
//       return [];
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const save = async (obj) => {
//   try {
//     const products = await getAll();
//     products.push(obj);
//     await fs.promises.writeFile(path, JSON.stringify(products));
//     return obj;
//   } catch (error) {
//     console.log(error);
//   }
// };

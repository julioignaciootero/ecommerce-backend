import { asProdDto } from "../../dto/productos.js";
import { getProdDao } from "../daos.js";

export default class productosRepository {
  constructor() {
    this.dao = getProdDao();
  }

  async save(prod) {
    const product = await this.dao.save(prod);
    return product;
  }

  async getAll() {
    const productos = await this.dao.getAll();
    console.log(productos);
    const prodsDTO = asProdDto(productos);
    return prodsDTO;
  }
}

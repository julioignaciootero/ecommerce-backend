import { asDto } from "../../dto/productos.js";
import { getDao } from "../daos.js";

export default class ProductsRepository {
  constructor() {
    this.dao = getDao();
  }

  async save(prod) {
    const product = await this.dao.save(prod);
    return product;
  }

  async getAll() {
    const products = await this.dao.getAll();
    const prodsDTO = asDto(products);
    return prodsDTO;
  }
}

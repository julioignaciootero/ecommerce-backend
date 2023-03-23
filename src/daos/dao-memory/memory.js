import { asProdDto } from "../../dto/productos.js";

export default class Memory {
  constructor() {
    this.productos = [];
  }

  async save(obj) {
    this.productos.push(obj);
    return obj;
  }

  async getAll() {
    return asDto(this.productos);
  }
}

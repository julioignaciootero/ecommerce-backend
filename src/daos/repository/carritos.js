import { asCarritosDto } from "../../dto/carritos.js";
import { getCarritoDao } from "../daos.js";

//Repository de carritos
export default class carritosRepository {
  constructor() {
    this.dao = getCarritoDao();
  }

  async save(carrito) {
    const c = await this.dao.save(carrito);
    return c;
  }

  async getAll() {
    const carritos = await this.dao.getAll();
    const carritoDto = asCarritosDto(carritos);
    return carritoDto;
  }
}

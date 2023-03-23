import carritosRepository from "../daos/repository/carritos.js";

const cRepository = new carritosRepository();

export async function saveCarrito(carrito) {
  const car = await cRepository.save(carrito);
  return car;
}

export async function getAllCarritos() {
  const carritos = await cRepository.getAll();
  return carritos;
}

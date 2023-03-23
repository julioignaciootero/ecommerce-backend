import productosRepository from "../daos/repository/productos.js";

const prodRepository = new productosRepository();

export async function saveProduct(product) {
  const prod = await prodRepository.save(product);
  return prod;
}

export async function getAllproductos() {
  const productos = await prodRepository.getAll();

  return productos;
}

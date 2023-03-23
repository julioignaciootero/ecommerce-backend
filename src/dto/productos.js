export default class productosDTO {
  constructor({ nombre, descripcion, codigo, foto, precio, stock }) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.foto = foto;
    this.precio = precio;
    this.stock = stock;
  }
}

export function asProdDto(prods) {
  if (Array.isArray(prods)) return prods.map((p) => new productosDTO(p));
  else return new productosDTO(prods);
}

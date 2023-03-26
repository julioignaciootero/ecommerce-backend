//DTO de carritos con el array de productos asignados
export default class carritosDTO {
  constructor({ _id, productos }) {
    this.id = _id;
    this.productos = productos;
  }
}

export function asCarritosDto(carritos) {
  if (Array.isArray(carritos)) return carritos.map((c) => new carritosDTO(c));
  else return new carritosDTO(carritos);
}

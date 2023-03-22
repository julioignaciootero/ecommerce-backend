export default class ProductsDTO {
  constructor({ title, price, url }) {
    this.title = title;
    this.price = price;
    this.url = url;
  }
}

export function asDto(prods) {
  if (Array.isArray(prods)) return prods.map((p) => new ProductsDTO(p));
  else return new ProductsDTO(prods);
}

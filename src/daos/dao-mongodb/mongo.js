import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { asProdDto } from "../../dto/productos.js";
import { asCarritosDto } from "../../dto/carritos.js";
import { prodcutosSchema } from "../../models/productos.js";
import { carritoSchema } from "../../models/carritos.js";

export default class MongoDB {
  constructor(collection) {
    this.collection = collection;
    switch (collection) {
      case "productos":
        this.model = mongoose.model(collection, prodcutosSchema);
        break;
      case "carritos":
        this.model = mongoose.model(collection, carritoSchema);
        break;
      default:
        break;
    }
  }

  async initMongoDB() {
    return this.initDB;
  }

  async save(doc) {
    try {
      const document = await this.model.create(doc);
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const docs = await this.model.find({});
      console.log(docs);
      switch (this.collection) {
        case "productos":
          return asProdDto(docs);

        case "carritos":
          return asCarritosDto(docs);
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

import mongoose from "mongoose";
import dotenv from "dotenv";
import { asProdDto } from "../../dto/productos.js";
import { asCarritosDto } from "../../dto/carritos.js";
import { prodcutosSchema } from "../../models/productos.js";
import { carritoSchema } from "../../models/carritos.js";
import { logger } from "../../config/logs.js";
dotenv.config();

//DAO para guardar la informacion en Mongo

//Clase principal
export default class MongoDB {
  constructor(collection) {
    this.collection = collection;

    //Segun la coleccion instanciamos el tipo
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

  //Iniciamos la BD
  async initMongoDB() {
    return this.initDB;
  }

  //Controler para guardar todo
  async save(doc) {
    try {
      const document = await this.model.create(doc);
      return document;
    } catch (error) {
      logger.error(error);
    }
  }

  //Obtener todo
  async getAll() {
    try {
      const docs = await this.model.find({});

      switch (this.collection) {
        case "productos":
          return asProdDto(docs);

        case "carritos":
          return asCarritosDto(docs);
        default:
          break;
      }
    } catch (error) {
      logger.error(error);
    }
  }
}

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import ProductsDTO, { asDto } from "../../dto/productos.js";

export default class MongoDB {
  static instance;

  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
    if (!MongoDB.instance) {
      this.initDB = mongoose.connect(process.env.MONGOURL);
      MongoDB.instance = this;
      console.log("Conectado a MongoDB!");
    } else {
      return MongoDB.instance;
    }
  }

  async initMongoDB() {
    return this.initDB;
  }

  async save(doc) {
    try {
      const document = await this.collection.create(doc);
      return document;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const docs = await this.collection.find({});
      return asDto(docs);
    } catch (error) {
      console.log(error);
    }
  }
}

// // export const initMongoDB = async () => {
// //     try {
// //         await mongoose.connect(process.env.MONGOURL);
// //         console.log('Conectado a Mongo!');
// //     } catch (error) {
// //         console.log(error);
// //     }
// // };

// export const save = async (doc) => {
//   try {
//     const document = await prodcutModel.create(doc);
//     return document;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getAll = async () => {
//   try {
//     const docs = await ProductsModel.find({});
//     return docs;
//   } catch (error) {
//     console.log(error);
//   }
// };

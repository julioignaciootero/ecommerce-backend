import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import path from "path";
import miRouter from "./routes/index.js";
import http from "http";
import { initDB } from "./db/db.js";
import { initWsServer } from "../src/services/socket.js";
import { loginFunction, signUpFunction } from "./services/auth.js";
import { logger } from "./config/logs.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

//Creacion y configuracion del Servidor
const app = express();
const myHttpServer = http.Server(app);
app.use(express.json());

await initDB();

//Ruta de vistas
const viewsFolderPath = path.resolve(__dirname, "../views");
app.set("views", viewsFolderPath);
app.set("view engine", "pug");

initWsServer(myHttpServer);

const ttlSeconds = 180;
const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.DB,
    // dbName: 'CODERHOUSE'
  }),
  secret: "mysecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

passport.use("login", loginFunction);
passport.use("signup", signUpFunction);
app.use("/api", miRouter);

app.get("/", async (req, res) => {
  res.render("index");
});

app.use((req, res, next) => {
  logger.warn(`Ruta desconocida ${req.originalUrl}`);
  res.status(404).send("<h1>Not found</h1>");
});

const PORT = process.env.PORT || 8080;

myHttpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en: `, PORT);
});

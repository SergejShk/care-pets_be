import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import dotenv from "dotenv";

import App from "./app";

import { UsersDb } from "./database/usersDb";
import { PetsDb } from "./database/petsDb";

import { AuthService } from "./services/authService";
import { UsersService } from "./services/usersService";
import { FilesService } from "./services/filesService";
import { PetsService } from "./services/petsService";

import { AuthMiddlewares } from "./middlewares/authMiddlewares";

import { AuthController } from "./controllers/AuthController";
import { UsersController } from "./controllers/UsersController";
import { FilesController } from "./controllers/FilesController";
import { PetsController } from "./controllers/PetsController";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const STAGE = process.env.STAGE;
const LOCAL_DATABASE_URL = process.env.LOCAL_DATABASE_URL;
const DATABASE_URL = process.env.DATABASE_URL;

const serverStart = async () => {
  try {
    const pool = new Pool({
      connectionString: STAGE === "LOCAL" ? LOCAL_DATABASE_URL : DATABASE_URL,
      ssl: STAGE === "LOCAL" ? false : true,
    });
    const db = drizzle(pool, {
      logger: STAGE === "LOCAL" ? true : false,
    });

    // migrations
    await migrate(db, { migrationsFolder: "./migrations" });

    // dbs
    const usersDb = new UsersDb(db);
    const petsDb = new PetsDb(db);

    // services
    const authService = new AuthService(usersDb);
    const usersService = new UsersService(usersDb);
    const filesService = new FilesService();
    const petsService = new PetsService(petsDb);

    // middlewares
    const authMiddlewares = new AuthMiddlewares(usersDb);

    //controllers
    const authController = new AuthController(authService, authMiddlewares);
    const usersController = new UsersController(usersService, authMiddlewares);
    const filesController = new FilesController(filesService, authMiddlewares);
    const petsController = new PetsController(petsService, authMiddlewares);

    const app = new App(PORT, [authController, usersController, filesController, petsController]);

    app.listen();
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

serverStart();

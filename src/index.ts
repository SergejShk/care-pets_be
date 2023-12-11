import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import dotenv from "dotenv";

import App from "./app";

import { UsersController } from "./controllers/UsersController";

dotenv.config();

const serverStart = async () => {
  try {
    const PORT = Number(process.env.PORT) || 5000;

    const pool = new Pool({
      connectionString:
        process.env.STAGE === "LOCAL"
          ? process.env.LOCAL_DATABASE_URL
          : process.env.DATABASE_URL,
      ssl: process.env.STAGE === "LOCAL" ? false : true,
    });
    const db = drizzle(pool, {
      logger: process.env.STAGE === "LOCAL" ? true : false,
    });

    // migrations
    await migrate(db, { migrationsFolder: "./migrations" });

    const usersController = new UsersController();

    const app = new App(PORT, [usersController]);

    app.listen();
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

serverStart();

import dotenv from "dotenv";

import App from "./app";

import { UsersController } from "./controllers/Users";

dotenv.config();

const serverStart = async () => {
  try {
    const PORT = Number(process.env.PORT) || 5000;

    const usersController = new UsersController();

    const app = new App(PORT, [usersController]);

    app.listen();
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

serverStart();

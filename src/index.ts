import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { recipeController } from "./routes/recipes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const options: CorsOptions = {
  origin: ["*"],
};

app.use(cors(options));
app.use(express.json());

app.get("/save", recipeController.save);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

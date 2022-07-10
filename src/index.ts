import  express, { json }  from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";


import router from "./routers/masterRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(json());
app.use(cors());
dotenv.config();

app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT, ()=> {
	console.log(chalk.bold.blue("Server up and running on port", process.env.PORT));
});

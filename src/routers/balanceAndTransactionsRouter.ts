import { Router } from "express";

import { validateBalanceInfo } from "../middlewares/balanceAndTransactionsValidation.js";
import getBalanceAndTransactions from "../controllers/balanceAndTransactionsController.js";


const balanceAndTransactionsRouter = Router();

balanceAndTransactionsRouter.get("/balance", validateBalanceInfo, getBalanceAndTransactions );


export default balanceAndTransactionsRouter;

import { Router } from "express";

import { validateIfCardId } from "../middlewares/balanceAndTransactionsValidation.js";
import getBalanceAndTransactions from "../controllers/balanceAndTransactionsController.js";


const balanceAndTransactionsRouter = Router();

balanceAndTransactionsRouter.get("/balance", validateIfCardId, getBalanceAndTransactions );


export default balanceAndTransactionsRouter;

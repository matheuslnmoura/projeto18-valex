import { Router } from "express";


import cardRouter from "./cardsRouter.js";
import paymentRouter from "./paymentRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import balanceAndTransactionsRouter from "./balanceAndTransactionsRouter.js";

const router = Router();

router.use(cardRouter);
router.use(rechargeRouter);
router.use(paymentRouter);
router.use(balanceAndTransactionsRouter);
export default router;
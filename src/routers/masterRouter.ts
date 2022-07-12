import { Router } from "express";


import cardRouter from "./cardsRouter.js";
import paymentRouter from "./paymentRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import balanceAndTransactionsRouter from "./balanceAndTransactionsRouter.js";
import blockRouter from "./blockCardRouter.js";

const router = Router();

router.use(cardRouter);
router.use(rechargeRouter);
router.use(paymentRouter);
router.use(balanceAndTransactionsRouter);
router.use(blockRouter);

export default router;
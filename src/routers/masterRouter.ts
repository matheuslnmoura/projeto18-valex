import { Router } from "express";


import cardRouter from "./cardsRouter.js";
import rechargeRouter from "./rechargeRouter.js";

const router = Router();

router.use(cardRouter);
router.use(rechargeRouter);

export default router;
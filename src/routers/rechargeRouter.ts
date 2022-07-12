import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController.js";
import { validateRechargeInfo } from "../middlewares/rechargeValidations.js";
import { validateApiKey, verifyIfApikey } from "../middlewares/verifyApiKey.js";


const rechargeRouter = Router();

rechargeRouter.patch("/recharge-card",	verifyIfApikey, validateApiKey, validateRechargeInfo, rechargeCard);


export default rechargeRouter;

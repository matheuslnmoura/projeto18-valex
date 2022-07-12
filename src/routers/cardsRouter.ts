import { Router } from "express";

import { activateCard, createCard, getCard } from "../controllers/cardsController.js";
import {verifyIfApikey, validateApiKey} from "../middlewares/verifyApiKey.js";
import { validateCreateCardInfo, validateActivateCardInfo, validateGetCardInfo } from "../middlewares/cardValidations.js";



const cardRouter = Router();

cardRouter.post (
	"/create-card",  
	verifyIfApikey, 
	validateApiKey, 
	createCard
);

cardRouter.patch("/activate-card", validateActivateCardInfo, activateCard);

cardRouter.get("/get-card", validateGetCardInfo, getCard);


export default cardRouter;
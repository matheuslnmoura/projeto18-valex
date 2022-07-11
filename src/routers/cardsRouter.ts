import { Router } from "express";

import { activateCard, createCard } from "../controllers/cardsController.js";
import {verifyIfApikey, validateApiKey} from "../middlewares/verifyApiKey.js";
import { validateCreateCardInfo, validateActivateCardInfo } from "../middlewares/cardValidations.js";



const cardRouter = Router();

cardRouter.post (
	"/create-card",  
	verifyIfApikey, 
	validateApiKey, 
	createCard
);

cardRouter.patch("/activate-card", validateActivateCardInfo, activateCard);


export default cardRouter;
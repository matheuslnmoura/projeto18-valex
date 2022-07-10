import { Router } from "express";
import { createCard } from "../controllers/cardsController.js";
import {verifyIfApikey, validateApiKey} from "../middlewares/verifyApiKey.js";

const cardRouter = Router();

cardRouter.post ("/create-card", verifyIfApikey, validateApiKey, createCard);

export default cardRouter;
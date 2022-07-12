import { Router } from "express";
import {blockCard, unBlockCard} from "../controllers/blockCardController.js";
import { validateBlockCardInfo } from "../middlewares/blockCardValidation.js";

const blockRouter = Router();

blockRouter.patch("/block-card", validateBlockCardInfo, blockCard);
blockRouter.patch("/unblock-card", validateBlockCardInfo, unBlockCard);

export default blockRouter;
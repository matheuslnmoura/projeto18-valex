import { Request, Response, NextFunction } from "express";
import joi from "joi";
import chalk from "chalk";

import { joiPasswordSchema } from "./cardValidations.js";


export function validateBlockCardInfo(req: Request, res: Response, next: NextFunction){
	const cardInfo = req.body;
	if(cardInfo.password) {
		cardInfo.password = cardInfo.password.toString();
	}

	const cardInfoSchema = joi.object({
		cardId: joi.number().integer().required(),
		password: joiPasswordSchema.required()
	});
	const { error } = cardInfoSchema.validate(cardInfo, {abortEarly: false});

	if (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(422);
	}

	res.locals.user = {cardId: parseInt(cardInfo.cardId), password: cardInfo.password};
	next();
}
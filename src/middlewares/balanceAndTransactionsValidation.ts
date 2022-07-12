import { Request, Response, NextFunction } from "express";
import joi from "joi";
import chalk from "chalk";

export function validateIfCardId(req: Request, res: Response, next: NextFunction){
	const cardInfo = req.body;

	const cardInfoSchema = joi.object({
		cardId: joi.number().integer().required()
	});
	const { error } = cardInfoSchema.validate(cardInfo, {abortEarly: false});

	if (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(422);
	}

	res.locals.user = parseInt(cardInfo.cardId);
	next();
}
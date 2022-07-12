import { Request, Response, NextFunction } from "express";
import joi from "joi";
import chalk from "chalk";


import { joiPasswordSchema } from "./cardValidations.js";


export function validatePaymentInfo(req: Request, res: Response, next: NextFunction){
	const PaymentInfo = req.body;
	if(PaymentInfo.password) {
		PaymentInfo.password = PaymentInfo.password.toString();
	}
	const PaymentInfoSchema = joi.object({
		cardId: joi.number().integer().required(),
		businessId: joi.number().integer().required(),
		password: joiPasswordSchema.required(),
		amount: joi.number().positive().required(),
	});
	const { error } = PaymentInfoSchema.validate(PaymentInfo, {abortEarly: false});

	if (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(422);
	}

	res.locals.user = PaymentInfo;
	next();
}
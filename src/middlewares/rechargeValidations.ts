import { Request, Response, NextFunction } from "express";
import joi from "joi";
import chalk from "chalk";


export function validateRechargeInfo(req: Request, res: Response, next: NextFunction){
	const RechargeInfo = req.body;
	const RechargeInfoSchema = joi.object({
		id: joi.number().integer().required(),
		amount: joi.number().positive().required(),
	});
	const { error } = RechargeInfoSchema.validate(RechargeInfo, {abortEarly: false});

	if (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(422);
	}
	next();
}
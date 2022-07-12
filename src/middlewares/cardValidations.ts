import { Request, Response, NextFunction } from "express";
import joi from "joi";
import chalk from "chalk";

const joiPasswordSchema = joi.string().length(4).pattern(/^[0-9]+$/).required();


export function validateCreateCardInfo(req: Request, res: Response, next: NextFunction){
	const createCardInfo = req.body;
	const createCardInfoSchema = joi.object({
		employeeId: joi.number().integer().required(),
		type: joi.string().required(),
	});
	const { error } = createCardInfoSchema.validate(createCardInfo, {abortEarly: false});

	if (error) {
		console.log(chalk.bold.red(error));
		return res.sendStatus(422);
	}
	next();
}

export function validateActivateCardInfo(req: Request, res: Response, next: NextFunction){
	const {id, password, CVV} = req.body;
	const activateCardInfo = {id, password: password.toString(), CVV};
	const activateCardInfoSchema = joi.object({
		id: joi.number().required(),
		password: joi.string().length(4).pattern(/^[0-9]+$/).required(),
		CVV: joi.number().required()
	});
	const { error } = activateCardInfoSchema.validate(activateCardInfo, {abortEarly: false});

	if (error) {
		throw{ name: 422, message: error.message };
	}
	res.locals.user = activateCardInfo;
	next();
}

export function validateGetCardInfo(req: Request, res: Response, next: NextFunction){
	const getCardInfo = req.body;
	const getCardInfoSchema = joi.object({
		employeeId: joi.number().integer().required(),
		cardPassword: joiPasswordSchema,
	});

	const {error} = getCardInfoSchema.validate(getCardInfo, {abortEarly: false});

	if (error) {
		throw{ name: 422, message: error.message };
	}
	next();

}



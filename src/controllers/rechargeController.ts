import { Request, Response } from "express";
import { insert } from "../repositories/rechargeRepository.js";
import { validateCardInfo } from "../services/cardService.js";

export async function rechargeCard(req: Request, res: Response) {
	const rechargeInfo = req.body;
	const{id, amount} = rechargeInfo;

	const validateRecharge = await validateCardInfo(id);

	if(!validateRecharge) {
		throw{name: 401, type: "invalid", message: "This card is not valid"};
	}

	await insert({cardId: id, amount});

	res.sendStatus(200);
}
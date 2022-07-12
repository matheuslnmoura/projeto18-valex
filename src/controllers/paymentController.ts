import { Request, Response } from "express";
import { insert } from "../repositories/paymentRepository.js";
import { validateCardInfo } from "../services/cardService.js";
import { checkPaymentInfos } from "../services/paymentService.js";

export async function createPayment(req: Request, res: Response) {
	const paymentInfo = res.locals.user;
	const {cardId, businessId, amount} = paymentInfo;

	await validateCardInfo(cardId);
	await checkPaymentInfos(paymentInfo);

	await insert({cardId, businessId, amount});

	res.sendStatus(200);

	// console.log(isPaymentValid);
}
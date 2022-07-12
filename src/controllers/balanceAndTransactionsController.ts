import { Request, Response } from "express";
import getBalanceInfos from "../services/balanceAndTransactionsService.js";
import { validateCardInfo } from "../services/cardService.js";

export default async function getBalanceAndTransactions(req: Request, res: Response) {
	const cardId = res.locals.user;

	await validateCardInfo(cardId);
	
	const balanceAndTransactionInfo = await getBalanceInfos(cardId);

	res.status(200).send(balanceAndTransactionInfo);
}
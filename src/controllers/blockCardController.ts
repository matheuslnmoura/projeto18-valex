import { Request, Response } from "express";
import { update } from "../repositories/cardRepository.js";
import { checkIfBlockable, checkIfUnBlockable } from "../services/blockCardService.js";

export async function blockCard(req: Request, res:Response) {
	const {cardId, password} = res.locals.user;

	await checkIfBlockable(cardId, password);

	await update(cardId, {isBlocked: true});

	res.sendStatus(200);
}

export async function unBlockCard(req: Request, res:Response) {
	const {cardId, password} = res.locals.user;

	await checkIfUnBlockable(cardId, password);

	await update(cardId, {isBlocked: false});

	res.sendStatus(200);
}
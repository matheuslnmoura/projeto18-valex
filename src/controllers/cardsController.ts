import { Request, Response } from "express";


import { insert, update } from "../repositories/cardRepository.js";
import { cardActivation, createCardInfo, getEmployeeCard } from "../services/cardService.js";
import { checkIfEmployeeExists } from "../services/employeeServices.js";

export async function createCard(req: Request, res:Response){
	const companyInfo = res.locals.user;
	const {id: companyId} = companyInfo;
	const reqInfo = req.body;
	const {employeeId, type} = reqInfo;

	const employeeInfo = await checkIfEmployeeExists(employeeId, companyId);

	const {cardObj, cardCVV} = await createCardInfo(employeeInfo, type);

	const cardResponse = {...cardObj, securityCode: cardCVV};
	
	await insert(cardObj);

	res.status(201).send(cardResponse);
}

export async function activateCard(req: Request, res: Response) {
	const activateCardInfo = res.locals.user;
	const { id } = activateCardInfo;

	const activateCardObj = await cardActivation(activateCardInfo);

	

	await update(id, activateCardObj);

	res.sendStatus(200);
	
}

export async function getCard(req: Request, res: Response) {
	const info = req.body;

	const getCardsObj = await getEmployeeCard(info);
	
	res.status(200).send(getCardsObj);
}
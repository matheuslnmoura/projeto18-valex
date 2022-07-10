import { Request, Response } from "express";

import { insert } from "../repositories/cardRepository.js";
import { createCardInfo } from "../services/cardService.js";
import { checkIfEmployeeExists } from "../services/employeeServices.js";

export async function createCard(req: Request, res:Response){
	const companyInfo = res.locals.user;
	const {id: companyId} = companyInfo;
	const reqInfo = req.body;
	const {employeeId, type} = reqInfo;

	const employeeInfo = await checkIfEmployeeExists(employeeId, companyId);

	const cardInfo = await createCardInfo(employeeInfo, type);
	
	await insert(cardInfo);

	res.sendStatus(201);
}
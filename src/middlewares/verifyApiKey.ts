import { NextFunction } from "connect";
import { Request, Response } from "express";

import { findByApiKey } from "../repositories/companyRepository.js";

export function verifyIfApikey (req: Request, res:Response, next: NextFunction) {
	const {"x-api-key": apiKey} = req.headers;

	if(!apiKey) {
		throw {code: 401, type: "Api_Key_Nout_Found", message: "You are not authorized to perform this operation"};
	}

	res.locals.user = apiKey;

	next();
}

export async function validateApiKey (req: Request, res:Response, next: NextFunction) {
	const apiKey: string = res.locals.user;

	const ApiKeyOnDatabase = await findByApiKey(apiKey);
	
	if(!ApiKeyOnDatabase) {
		throw {name: 401, type: "Api_Key_Nout_Valid", message: "You are not authorized to perform this operation"};
	}

	res.locals.user = ApiKeyOnDatabase;
	next();
}
import {NextFunction, Request, Response} from "express";
import "express-async-errors";

export default function errorHandler (error:Error, req: Request, res: Response, next: NextFunction) {
	return res.status(parseInt(error.name)).send(error.message); // internal server error
}
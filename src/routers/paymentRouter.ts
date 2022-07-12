import { Router } from "express";


import { createPayment } from "../controllers/paymentController.js";
import { validatePaymentInfo } from "../middlewares/paymentValidations.js";


const paymentRouter = Router();

paymentRouter.post("/payment", validatePaymentInfo, createPayment);


export default paymentRouter;

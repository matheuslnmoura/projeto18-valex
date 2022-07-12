import { checkCardBalance } from "../utils/paymentUtils.js";
import { findByCardId as getPaymentsByCardId } from "../repositories/paymentRepository.js";
import { findByCardId as getRechargesByCardId } from "../repositories/rechargeRepository.js";


export default async function getBalanceInfos(cardId: number) {
	const balance = await checkCardBalance(cardId);
	const transactions = await getPaymentsByCardId(cardId);
	const recharges = await getRechargesByCardId(cardId);

	const responseObj = {
		balance,
		transactions,
		recharges
	};

	return responseObj;
}

import { findByCardId as getPaymentsByCardId } from "../repositories/paymentRepository.js";
import { findByCardId as getRechargesByCardId } from "../repositories/rechargeRepository.js";


export function checkCardAndBusinessTypes(cardType: string, businessType: string) {
	if (cardType !== businessType) {
		return false;
	}
	return true;
}

export async function checkCardBalance(cardId: number) {
	const recharges = await getRechargesByCardId(cardId);
	const payments = await getPaymentsByCardId(cardId);

	const totalRecharges = sumValues(recharges);
	const totalPayments = sumValues(payments);

	const balance = totalRecharges - totalPayments;
	return balance;
}

function sumValues(values) {
	let totalAmount = 0;

	for(let i = 0; i < values.length; i++) {
		const value = values[i];
		totalAmount += value.amount;
	}

	return totalAmount;
}


import { findById as getBusinessById } from "../repositories/businessRepository.js";
import { findById as getCardById } from "../repositories/cardRepository.js";
import { checkIfCardIsActive, validatePassword, valideExpirationDate } from "../utils/cardUtils.js";
import { checkCardAndBusinessTypes, checkCardBalance } from "../utils/paymentUtils.js";


export async function checkPaymentInfos(paymentInfo) {
	const {cardId, businessId, password, amount} = paymentInfo;

	const card = await getCardById(cardId);
	const { password: hashPassword, type: cardType } = card;

	const isPasswordValid = await validatePassword(password, hashPassword);
	if(!isPasswordValid) {
		throw {name: 401, type: "incorrect password", message: "Incorrect Password"};
	}

	const business = await getBusinessById(businessId);
	if(!business) {
		throw { name: 401, type: "invalid business", message: "This business is not registred"};
	}

	const { type: businessType } = business;

	const isBusinessTypeValid = checkCardAndBusinessTypes(cardType, businessType);
	if(!isBusinessTypeValid) {
		throw { name: 401, type: "invalid transaction", message: "This transaction is not valid on this business"};
	}

	const cardBalance = await checkCardBalance(cardId);

	if((cardBalance - amount) < 0) {
		throw {name: 401, type: "not enough balance", message: "Not Enough Balance"};
	}

	return true;
}
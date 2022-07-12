import { findByEmployeeId, findById, TransactionTypes } from "../repositories/cardRepository.js";
import { checkIfCardIsActive, createCardCVV, createCardholderName, createCardNumber, createExpirationDate, cryptCVV, decryptCVV, encryptCardPassword, validateCVV, validatePassword, valideExpirationDate } from "../utils/cardUtils.js";


export async function createCardInfo(employeeInfo, cardType: TransactionTypes) {
	const {id: employeeId, fullName} = employeeInfo;

	const number = await createCardNumber();
	const cardholderName = createCardholderName(fullName);
	const expirationDate = createExpirationDate();
	const cardCVV = createCardCVV();
	const securityCode = cryptCVV(cardCVV);
	const password = null;
	const isVirtual = false;
	const originalCardId = null;
	const isBlocked = false;
	const type = cardType;

	const cardObj = {
		employeeId,
		number,
		cardholderName,
		securityCode,
		expirationDate,
		password,
		isVirtual,
		originalCardId,
		isBlocked,
		type
	};

	return {cardObj, cardCVV};

}

export async function cardActivation(info) {
	const {id, password, CVV} = info;

	const checkCardInfo = await findById(id);
	if(!checkCardInfo) {
		throw {name: 404, message: "Card not found"};
	}

	const{expirationDate, password: databasePassword, securityCode} = checkCardInfo;

	const isCardValid = await valideExpirationDate(expirationDate);
	if(!isCardValid) {
		throw {name: 401, message: "This card expired"};
	}

	if(databasePassword !== null) {
		throw {name: 401, message: "This card has already been activated"};
	}


	const isCVVValid = await validateCVV(CVV, securityCode);
	if(isCVVValid === false) {
		throw {name: 401, message: "Invalid CVV"};
	}
	
	const hashPassword = encryptCardPassword(password);
	

	const activateCardObj= {
		password: hashPassword
	};

	return activateCardObj;

}

export async function getEmployeeCard(info) {
	const { employeeId, cardPassword} = info;

	const cards = await findByEmployeeId(employeeId);

	const matchedCards = [];
	for(let i = 0; i < cards.length; i++) {
		const card = cards[i];
		const {password: databasePassword, number, cardholderName, expirationDate, securityCode} = card;
		const isValidPassword = await validatePassword(cardPassword, databasePassword);

		if(isValidPassword) {
			const decryptedCVV =  decryptCVV(securityCode);
			matchedCards.push({
				number,
				cardholderName,
				expirationDate,
				securityCode: `${decryptedCVV}`,
			});
		}
	}

	return matchedCards;
}

export async function validateCardInfo(cardId: number) {
	const card = await findById(cardId);

	if(!card) {
		throw{name: 404, type: "Card not found", message: "Card not found"};
	}

	const isCardActive = await checkIfCardIsActive(card);

	if(!isCardActive) {
		throw{name: 401, type: "Card not active", message: "This card is not active"};
	}

	const { expirationDate, isBlocked } = card;

	const isValidDate = await valideExpirationDate(expirationDate);

	if(!isValidDate) {
		throw{ name: 401, type: "expired", message:"This card is expired"};
	}

	if(isBlocked) {
		throw{ name: 401, type: "blocked", message:"This card is blocked"};
	}

	return true;
}







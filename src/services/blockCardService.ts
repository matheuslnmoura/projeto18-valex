import { checkIfCardIsActive, validatePassword, valideExpirationDate } from "../utils/cardUtils.js";
import { validateCardInfo } from "./cardService.js";
import { findById, findById as getCardById } from "../repositories/cardRepository.js";


export async function checkIfBlockable(cardId: number, password: string) {
	await validateCardInfo(cardId);

	const card = await getCardById(cardId);
	const { password: hashPassword } = card;
	const isPasswordValid = await validatePassword(password, hashPassword);
	if(!isPasswordValid) {
		throw {name: 401, type: "incorrect password", message: "Incorrect Password"};
	}

	return true;
}

export async function checkIfUnBlockable(cardId: number, password: string) {
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

	const { password: hashPassword } = card;
	const isPasswordValid = await validatePassword(password, hashPassword);
	if(!isPasswordValid) {
		throw {name: 401, type: "incorrect password", message: "Incorrect Password"};
	}

	if(!isBlocked) {
		throw{ name: 401, type: "blocked", message:"This card is blocked"};
	}

	return true;
}
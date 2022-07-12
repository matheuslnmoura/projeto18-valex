import { findById } from "../repositories/cardRepository.js";
import { checkIfCardIsActive, valideExpirationDate } from "../utils/cardUtils.js";



export async function validateCardInfo(cardId: number) {
	const card = await findById(cardId);

	if(!card) {
		throw{name: 404, type: "Card not found", message: "Card not found"};
	}

	const isCardActive = await checkIfCardIsActive(card);

	if(!isCardActive) {
		throw{name: 401, type: "Card not active", message: "This card is not active"};
	}

	const { expirationDate } = card;

	const isValidDate = await valideExpirationDate(expirationDate);

	if(!isValidDate) {
		throw{ name: 401, type: "expired", message:"This card is expired"};
	}

	return true;
}
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";

import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createCardInfo(employeeInfo, cardType: TransactionTypes) {
	const {id: employeeId, fullName} = employeeInfo;
	// console.log(employeeInfo);
	// console.log(type);

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

	return cardObj;

}

async function createCardNumber() {
	return faker.finance.creditCardNumber();
}

function createCardholderName(fullName: string) {
	const fullNameArr = fullName.split(" ");
	let middleNameInitials = "";

	for(let i = 1; i < ((fullNameArr.length) -1 ); i++) { 
		const middleNames = fullNameArr[i];
		if(middleNames.length > 3) {
			middleNameInitials += middleNames[0] + " ";
		}
	}

	const cardholderName = `${fullNameArr[0]} ${middleNameInitials}${fullNameArr[fullNameArr.length - 1]}`;
	
	return cardholderName;
}

function createExpirationDate() {
	const today = new Date();
	const currentYear = today.getFullYear();
	const expirationYear = (currentYear + 5).toString();
	const mm = today.getMonth() + 1;

	const expirationDate = `${mm < 10? "0" + mm: mm}/${expirationYear[expirationYear.length - 2]}${expirationYear[expirationYear.length - 1]}`;

	return expirationDate;
}

function createCardCVV() {
	return faker.finance.creditCardCVV();
}

function cryptCVV(cardCVV: string) {
	const cryptr = new Cryptr("unlockCVV");
	const encryptedCVV = cryptr.encrypt(cardCVV);
	return encryptedCVV;
}
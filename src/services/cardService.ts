import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import { findById, TransactionTypes } from "../repositories/cardRepository.js";

const cryptr = new Cryptr("unlockCVV");

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



/////////// Aux Functions ///////////




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
	const encryptedCVV = cryptr.encrypt(cardCVV);
	return encryptedCVV;
}

function encryptCardPassword(password) {
	const saltRounds = 12;
	const hashPassword = bcrypt.hashSync(password, saltRounds);
	return hashPassword;
}

async function valideExpirationDate(expirationDate: string) {
	const dateArr = expirationDate.split("/");
	const lastDayOfMonth = "30";

	const expirationYear = `20${dateArr[dateArr.length - 1]}`;
	const expirationMonth = dateArr[0];
	const fullExpirationDate = new Date(`${expirationYear}-${expirationMonth}-${lastDayOfMonth}`);
	const expirationDateTime = fullExpirationDate.getTime();

	const today = new Date();
	const todayTime = today.getTime();

	if(expirationDateTime - todayTime <= 0) {
		return false;
	}

	return true;
}

async function validateCVV(CVV, securityCode: string) {
	const decryptedCVV = parseInt(cryptr.decrypt(securityCode));

	if(parseInt(CVV) !== decryptedCVV) {
		return false;
	}
	return true;
}


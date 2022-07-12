import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";


const cryptr = new Cryptr("unlockCVV");

export async function createCardNumber() {
	return faker.finance.creditCardNumber();
}

export function createCardholderName(fullName: string) {
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

export function createExpirationDate() {
	const today = new Date();
	const currentYear = today.getFullYear();
	const expirationYear = (currentYear + 5).toString();
	const mm = today.getMonth() + 1;

	const expirationDate = `${mm < 10? "0" + mm: mm}/${expirationYear[expirationYear.length - 2]}${expirationYear[expirationYear.length - 1]}`;

	return expirationDate;
}

export function createCardCVV() {
	return faker.finance.creditCardCVV();
}

export function cryptCVV(cardCVV: string) {
	const encryptedCVV = cryptr.encrypt(cardCVV);
	return encryptedCVV;
}

export function encryptCardPassword(password: string) {
	const saltRounds = 12;
	const hashPassword = bcrypt.hashSync(password, saltRounds);
	return hashPassword;
}

export async function valideExpirationDate(expirationDate: string) {
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

export async function validateCVV(CVV, securityCode: string) {
	const decryptedCVV = parseInt(cryptr.decrypt(securityCode));
	console.log(decryptedCVV);
	console.log(CVV);

	if(parseInt(CVV) !== decryptedCVV) {
		return false;
	}
	return true;
}

export function decryptCVV(securityCode) {
	const decryptedCVV = parseInt(cryptr.decrypt(securityCode));
	return decryptedCVV;
}

export async function validatePassword(cardPassword: string, databasePassword: string) {
	const isValidPassword = bcrypt.compareSync(cardPassword, databasePassword);
	return isValidPassword;
}

export async function checkIfCardIsActive(card) {
	const { password } = card;
	if(!password) {
		return false;
	}
	return true;
}
import { faker } from "@faker-js/faker";

import { findById } from "../repositories/employeeRepository.js";

export async function checkIfEmployeeExists(employeeId: number, companyId: number) {
	const employeeInfo = await findById(employeeId);

	if(!employeeInfo) {
		throw {name: 404, message: "Employee not found"};
	}

	const {companyId: registredCompanyId} = employeeInfo;
	checkIfEmployeeifFromCompany(employeeId, companyId, registredCompanyId);

	return employeeInfo;

}

async function checkIfEmployeeifFromCompany(employeeId: number, companyId: number, registredCompanyId:number) {
	if(companyId === registredCompanyId) {
		return true;
	} else {
		throw {name: 401, message: "This Employee is not registred to your company"};
	}
}


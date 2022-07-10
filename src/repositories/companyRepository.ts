import { connection } from "./../config/database.js";

export interface Company {
  id: number;
  name: string;
  apiKey?: string;
}

export async function findByApiKey(apiKey: string) {
	const result = await connection.query(
		`SELECT * FROM companies 
		WHERE "apiKey"=$1`,
		[apiKey]
	);

	return result.rows[0];
}

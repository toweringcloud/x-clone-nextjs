"use server";

import { slow } from "../utils";

export async function logIn(prevState: any, formData: FormData) {
	await slow(1);
	console.log(prevState);

	const data = {
		email: formData.get("email"),
		username: formData.get("username"),
		password: formData.get("password"),
	};

	if (data.password != "12345") {
		return {
			fieldErrors: {
				password: ["Wrong Password!"],
			},
		};
	} else {
		return {
			fieldErrors: {},
		};
	}
}

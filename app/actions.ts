"use server";

import { z } from "zod";

import { slow } from "@/libs/utils";
import {
	EMAIL_NOT_ALLOWED_ERROR,
	PASSWORD_MIN_LENGTH,
	PASSWORD_MIN_LENGTH_ERROR,
	PASSWORD_REGEX,
	PASSWORD_REGEX_ERROR,
	USERNAME_MIN_LENGTH,
	USERNAME_MIN_LENGTH_ERROR,
} from "@/libs/constants";

const formSchema = z.object({
	email: z
		.string()
		.toLowerCase()
		.refine((i) => i.includes("@zod.com"), EMAIL_NOT_ALLOWED_ERROR),
	username: z
		.string()
		.refine(
			(i) => i.length >= USERNAME_MIN_LENGTH,
			USERNAME_MIN_LENGTH_ERROR
		),
	password: z
		.string()
		.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
		.refine(
			(i) => i.length >= PASSWORD_MIN_LENGTH,
			PASSWORD_MIN_LENGTH_ERROR
		),
});

export async function logIn(prevState: any, formData: FormData) {
	await slow(1);
	console.log(prevState);

	const data = {
		email: formData.get("email"),
		username: formData.get("username"),
		password: formData.get("password"),
	};

	const result = formSchema.safeParse(data);
	if (!result.success) {
		console.log(result.error.flatten());
		return result.error.flatten();
	} else {
		return {
			fieldErrors: {},
		};
	}
}

"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/libs/constants";
import { db } from "@/libs/db";
import getSession from "@/libs/session";

const formSchema = z.object({
	email: z.string().trim().toLowerCase(),
	password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function logIn(prevState: any, formData: FormData) {
	//-validate user input
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};
	const result = await formSchema.spa(data);
	if (!result.success) {
		return result.error.flatten();
	}

	//-check user registration
	const user = await db.user.findUnique({
		where: {
			email: result.data.email,
		},
		select: {
			id: true,
			password: true,
		},
	});
	if (!user) {
		console.log(`${data.email} not exists!`);
		redirect("/create-account");
	}

	//-verify user password
	console.log("[p1] " + result.data.password);
	console.log("[p2] " + user!.password);
	const ok = await bcrypt.compare(
		result.data.password,
		user!.password ?? ":::__:::"
	);
	if (ok) {
		const session = await getSession();
		session.id = user!.id;
		await session.save();
		redirect("/profile");
	} else {
		return {
			fieldErrors: {
				password: ["Wrong password."],
			},
		};
	}
}

"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

import {
	EMAIL_NOT_ALLOWED_ERROR,
	PASSWORD_MIN_LENGTH,
	PASSWORD_REGEX,
	PASSWORD_REGEX_ERROR,
	USERNAME_MIN_LENGTH,
	USERNAME_MIN_LENGTH_ERROR,
} from "@/libs/constants";
import { db } from "@/libs/db";
import getSession from "@/libs/session";

const checkPasswords = ({
	password,
	confirm_password,
}: {
	password: string;
	confirm_password: string;
}) => password === confirm_password;

const formSchema = z
	.object({
		username: z
			.string()
			.trim()
			.refine(
				(i) => i.length >= USERNAME_MIN_LENGTH,
				USERNAME_MIN_LENGTH_ERROR
			),
		email: z
			.string()
			.email()
			.toLowerCase()
			.refine((i) => i.includes("@gmail.com"), EMAIL_NOT_ALLOWED_ERROR),
		password: z
			.string()
			.min(PASSWORD_MIN_LENGTH)
			.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
		confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
	})
	.superRefine(async ({ username }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				username,
			},
			select: {
				id: true,
			},
		});
		if (user) {
			ctx.addIssue({
				code: "custom",
				message: "This username is already taken",
				path: ["username"],
				fatal: true,
			});
			return z.NEVER;
		}
	})
	.superRefine(async ({ email }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
			},
		});
		if (user) {
			ctx.addIssue({
				code: "custom",
				message: "This email is already taken",
				path: ["email"],
				fatal: true,
			});
			return z.NEVER;
		}
	})
	.refine(checkPasswords, {
		message: "Both passwords should be the same!",
		path: ["confirm_password"],
	});

export async function createAccount(prevState: any, formData: FormData) {
	// validate user input
	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirm_password: formData.get("confirm_password"),
	};
	const result = await formSchema.spa(data);
	if (!result.success) {
		console.log(result.error.flatten());
		return result.error.flatten();
	}

	// register user info
	const hashedPassword = await bcrypt.hash(result.data.password, 12);
	const user = await db.user.create({
		data: {
			username: result.data.username,
			email: result.data.email,
			password: hashedPassword,
		},
		select: {
			id: true,
		},
	});
	const session = await getSession();
	session.id = user.id;
	await session.save();
	redirect("/log-in");
}

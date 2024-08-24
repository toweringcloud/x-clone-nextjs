"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/libs/db";
import getSession from "@/libs/session";

export async function getUser() {
	const session = await getSession();
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		});
		if (user) {
			return user;
		}
	}
	redirect("/log-in");
}

const formSchemaModify = z.object({
	id: z.number(),
	username: z.string(),
	email: z.string(),
});

export async function modifyUser(prevState: any, formData: FormData) {
	const data = {
		id: formData.get("id"),
		username: formData.get("username"),
		email: formData.get("email"),
	};
	console.log("# modifyUser.i: " + JSON.stringify(formData));

	const result = await formSchemaModify.spa(data);
	if (!result.success) {
		return result.error.flatten();
	}
	console.log("# modifyUser.o: " + JSON.stringify(result));

	const session = await getSession();
	if (session.id) {
		await db.user.update({
			where: {
				id: session.id,
			},
			data: {
				username: result.data.username,
				email: result.data.email,
			},
		});
	}
	redirect(`/users/${data.username}`);
}

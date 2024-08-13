"use server";

import { notFound, redirect } from "next/navigation";

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
		return user;
	}
	redirect("/log-in");
}

export async function getTweet(id: number) {
	try {
		const tweet = await db.tweet.findUnique({
			where: {
				id,
			},
			include: {
				user: {
					select: {
						username: true,
					},
				},
			},
		});
		return tweet;
	} catch (e) {
		return notFound;
	}
}

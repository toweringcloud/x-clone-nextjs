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

export async function getTweetCount() {
	const tweetCount = await db.tweet.count({});
	if (!tweetCount) return 0;
	return tweetCount;
}

export async function getTweets(count: number, page: number) {
	const tweets = await db.tweet.findMany({
		select: {
			id: true,
			tweet: true,
			createdAt: true,
		},
		skip: count * page,
		take: count,
		orderBy: {
			createdAt: "desc",
		},
	});
	if (!tweets) return [];
	return tweets;
}

const formSchema = z.object({
	tweet: z.string({ required_error: "Tweet is required!" }),
});

export async function addTweet(prevState: any, formData: FormData) {
	//-validate user input
	const data = {
		tweet: formData.get("tweet"),
	};
	const result = await formSchema.spa(data);
	if (!result.success) {
		return result.error.flatten();
	}

	//-add user's tweet
	const session = await getSession();
	if (session.id) {
		await db.tweet.create({
			data: {
				tweet: result.data.tweet,
				user: {
					connect: {
						id: session.id,
					},
				},
			},
			select: {
				id: true,
			},
		});
		redirect("/");
	}
}

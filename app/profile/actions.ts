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
	const session = await getSession();
	if (session.id) {
		const tweets = await db.tweet.findMany({
			select: {
				id: true,
				tweet: true,
				views: true,
				createdAt: true,
				user: {
					select: {
						id: true,
					},
				},
				_count: {
					select: {
						comments: true,
						likes: true,
					},
				},
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
}

const formSchemaRemove = z.object({
	tweetId: z.string(),
});

export async function removeTweet(prevState: any, formData: FormData) {
	const data = {
		tweetId: formData.get("tweetId") as string,
	};
	console.log("# removeTweet: " + JSON.stringify(formData));
	const result = await formSchemaRemove.spa(data);
	if (!result.success) {
		return result.error.flatten();
	}

	await db.tweet.delete({
		where: {
			id: parseInt(data.tweetId),
		},
	});
	redirect("/profile");
}

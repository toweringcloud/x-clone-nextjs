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

export async function getTweetCount(keyword: string) {
	const tweetCount = await db.tweet.count({
		where: {
			tweet: {
				contains: keyword,
			},
		},
	});
	if (!tweetCount) return 0;
	return tweetCount;
}

export async function searchTweets(
	keyword: string,
	count: number,
	page: number
) {
	const tweets = await db.tweet.findMany({
		select: {
			id: true,
			tweet: true,
			views: true,
			createdAt: true,
			user: {
				select: {
					username: true,
				},
			},
			_count: {
				select: {
					comments: true,
					likes: true,
				},
			},
		},
		where: {
			tweet: {
				contains: keyword,
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

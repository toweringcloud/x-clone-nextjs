"use server";

import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
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
		return user;
	}
	redirect("/log-in");
}

export async function getTweet(id: number) {
	try {
		const tweet = await db.tweet.update({
			where: {
				id,
			},
			data: {
				views: {
					increment: 1,
				},
			},
			include: {
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
		});
		return tweet;
	} catch (e) {
		return notFound;
	}
}

export async function likeTweet(tweetId: number) {
	await new Promise((r) => setTimeout(r, 500));
	const session = await getSession();
	try {
		await db.like.create({
			data: {
				tweetId,
				userId: session.id!,
			},
		});
		revalidateTag(`like-status-${tweetId}`);
	} catch (e) {}
}

export async function dislikeTweet(tweetId: number) {
	await new Promise((r) => setTimeout(r, 500));
	try {
		const session = await getSession();
		await db.like.delete({
			where: {
				cid: {
					tweetId,
					userId: session.id!,
				},
			},
		});
		revalidateTag(`like-status-${tweetId}`);
	} catch (e) {}
}

export async function getIsLiked(tweetId: number) {
	const session = await getSession();
	const like = await db.like.findUnique({
		where: {
			cid: {
				tweetId,
				userId: session.id!,
			},
		},
	});
	return like == null ? false : true;
}

export async function getLikeStatus(tweetId: number) {
	const isLiked = await getIsLiked(tweetId);
	const likeCount = await db.like.count({
		where: {
			tweetId,
		},
	});
	console.log("# getLikeStatus: " + likeCount);
	return {
		likeCount,
		isLiked,
	};
}

export async function getCommentCount(tweetId: number) {
	const commentCount = await db.comment.count({
		where: {
			tweetId,
		},
	});
	if (!commentCount) return 0;
	return commentCount;
}

export async function getComments(
	count: number,
	page: number,
	tweetId: number
) {
	const comments = await db.comment.findMany({
		select: {
			id: true,
			payload: true,
			created_at: true,
			user: {
				select: {
					id: true,
				},
			},
		},
		where: {
			tweetId,
		},
		skip: count * page,
		take: count,
		orderBy: {
			created_at: "desc",
		},
	});
	if (!comments) return [];
	return comments;
}

const formSchemaAdd = z.object({
	payload: z.string({ required_error: "Comment is required!" }),
	tweetId: z.string(),
});

export async function addComment(prevState: any, formData: FormData) {
	const data = {
		payload: formData.get("payload"),
		tweetId: formData.get("tweetId") as string,
	};
	console.log("# addComment: " + JSON.stringify(formData));
	const result = await formSchemaAdd.spa(data);
	if (!result.success) {
		return result.error.flatten();
	}

	const session = await getSession();
	if (session.id && data.tweetId) {
		await db.comment.create({
			data: {
				payload: result.data.payload,
				user: {
					connect: {
						id: session.id,
					},
				},
				tweet: {
					connect: {
						id: parseInt(data.tweetId),
					},
				},
			},
			select: {
				id: true,
			},
		});
		redirect(`/tweets/${data.tweetId}`);
	}
}

const formSchemaRemove = z.object({
	tweetId: z.string(),
	commentId: z.string(),
});

export async function removeComment(prevState: any, formData: FormData) {
	const data = {
		tweetId: formData.get("tweetId") as string,
		commentId: formData.get("commentId") as string,
	};
	console.log("# removeComment: " + JSON.stringify(formData));
	const result = await formSchemaRemove.spa(data);
	if (!result.success) {
		return result.error.flatten();
	}

	await db.comment.delete({
		where: {
			id: parseInt(data.commentId),
		},
	});
	redirect(`/tweets/${data.tweetId}`);
}

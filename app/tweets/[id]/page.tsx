import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import { EyeIcon, UserIcon } from "@heroicons/react/24/solid";

import Button from "@/components/Button";
import ButtonLike from "@/components/ButtonLike";
import AddComment from "@/components/AddComment";
import RemoveComment from "@/components/RemoveComment";
import { formatToTimeAgo } from "@/libs/utils";
import {
	getUser,
	getTweet,
	getLikeStatus,
	getCommentCount,
	getComments,
	addComment,
	removeComment,
} from "./actions";

const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
	tags: ["tweet-detail"],
	revalidate: 60,
});

export default async function Detail({ params }) {
	const user = await getUser();
	console.log("# user : " + user!.username);

	const id = Number(params.id);
	if (isNaN(id)) {
		return notFound();
	}

	const tweet: any = await getCachedTweet(id);
	if (!tweet) {
		return notFound();
	}

	const { likeCount, isLiked } = await getLikeStatus(id);

	const commentCount = await getCommentCount(id);
	console.log("# comments : " + commentCount);

	let currentPage = 0;
	const pageCount = commentCount / 3 + 1;
	const comments = await getComments(3, currentPage, id);

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="flex flex-col gap-10 py-8 px-6 mx-[15%] min-w-[400px]">
				<div className="text-3xl text-center">🧡 Detail 🧡</div>
				<Link href="/">
					<Button text="Go to Home" />
				</Link>
				<h2>Tweet Info ({tweet?.id})</h2>
				<hr className="-mt-9 -mb-5" />
				<div className="flex flex-col gap-2 text-gray-400">
					<span className="mb-2">{tweet?.tweet}</span>
					<div className="flex justify-between items-start *:flex *:gap-2 -mb-4">
						<span className="text-pretty">
							<UserIcon className="size-5" />
							{tweet?.user.username}
						</span>
						<span>
							{formatToTimeAgo(tweet?.createdAt.toString())}
						</span>
					</div>
				</div>
				<hr className="-mt-5 -mb-8" />
				<div className="flex justify-between items-start">
					<div className="flex items-center gap-2 text-neutral-400 text-sm">
						<EyeIcon className="size-5" />
						<span>View {tweet.views}</span>
					</div>
					<ButtonLike
						isLiked={isLiked}
						likeCount={likeCount}
						tweetId={id}
					/>
				</div>
				<AddComment action={addComment} tweetId={tweet?.id} />
				<div className="flex justify-between gap-5">
					<h2>Latest 3 Comments</h2>
					<span className="text-gray-400">Total {commentCount}</span>
				</div>
				<hr className="-mt-9 -mb-5" />
				<div className="flex flex-col gap-3">
					{comments.map((comment) => (
						<div key={comment.id}>
							<div className="text-xs border rounded-md p-3 bg-orange-500 hover:bg-orange-700 flex justify-between items-center">
								<div className="text-white flex gap-2 w-[75%]">
									{comment.payload}
								</div>
								<div className="text-gray-200 pl-1">
									{comment.created_at.toLocaleTimeString()}
								</div>
								<div className="flex items-center">
									<RemoveComment
										action={removeComment}
										tweetId={tweet?.id}
										commentId={comment.id}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

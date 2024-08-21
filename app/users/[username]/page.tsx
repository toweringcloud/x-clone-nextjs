import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { EyeIcon } from "@heroicons/react/24/solid";
import {
	ChatBubbleBottomCenterIcon,
	HandThumbUpIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/Button";
import RemoveTweet from "@/components/RemoveTweet";
import { db } from "@/libs/db";
import getSession from "@/libs/session";

import {
	getUser,
	getTweetCount,
	getTweets,
	addTweet,
	removeTweet,
} from "./actions";

export default async function Detail({ params }) {
	const user = await getUser();
	console.log(user!.username);

	const userName = params.username;
	console.log(userName);
	// if (isNaN(userName) || user!.username !== userName) {
	// 	return notFound();
	// }

	const tweetCount = await getTweetCount();
	console.log("# tweets : " + tweetCount);

	let currentPage = 0;
	const pageCount = tweetCount / 3 + 1;
	const tweets = await getTweets(3, currentPage);

	return (
		<div className="h-screen flex justify-center items-start">
			<div className="mx-[10%] min-w-[500px] py-10 px-6 flex flex-col gap-8">
				<div className="text-3xl text-center">🖤 User Info 🖤</div>
				<div className="grid grid-cols-2 gap-2">
					<span>
						<Link href="/">
							<Button text="Go to Home" />
						</Link>
					</span>
					<span>
						<Link href="/search">
							<Button text="Go to Search" color="Y" />
						</Link>
					</span>
				</div>

				<h1 className="text-center">
					<span>::::: Story of </span>
					<span className="text-green-900 text-lg font-bold">
						{user?.username}
					</span>
					<span> :::::</span>
				</h1>
				<div className="flex justify-center items-center text-gray-300 -mt-20 -mb-12">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="size-80"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</div>

				<div className="flex justify-between gap-5">
					<h2>Latest 3 Tweets</h2>
					<span className="text-gray-400">Total {tweetCount}</span>
				</div>
				<hr className="-mt-8 -mb-5" />
				<div className="flex flex-col gap-3">
					{tweets.map((item) => (
						<div key={item.id}>
							<Link href={`/tweets/${item.id}`}>
								<div className="text-xs border rounded-md p-3 bg-stone-500 hover:bg-stone-700 flex justify-between items-center">
									<div className="flex text-white w-[80%]">
										{item.tweet}
									</div>
									<div className="text-gray-200 pl-1">
										{item.createdAt.toLocaleTimeString()}
									</div>
								</div>
							</Link>
							<div className="text-xs text-gray-400 mt-1 flex justify-between">
								<div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
									<span>
										<EyeIcon className="size-4" />
										{item.views}
									</span>
									<span>
										<HandThumbUpIcon className="size-4" />
										{item._count.likes}
									</span>
									<span>
										<ChatBubbleBottomCenterIcon className="size-4" />
										{item._count.comments}
									</span>
								</div>
								<div className="flex gap-1 items-center *:flex *:gap-1 *:items-center">
									{user.id === item.user.id ? (
										<>
											<PencilSquareIcon className="size-4 text-teal-500" />
											<RemoveTweet
												action={removeTweet}
												tweetId={item.id}
											/>
										</>
									) : null}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

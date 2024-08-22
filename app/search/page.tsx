import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/solid";
import {
	ChatBubbleBottomCenterIcon,
	HandThumbUpIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/Button";
import SearchTweet from "@/components/SearchTweet";

import { getUser, getTweetCount, searchTweets } from "./actions";

export default async function Search() {
	const user = await getUser();
	console.log("# users : " + user!.username);

	const tweetCount = await getTweetCount("소리");
	console.log("# tweets : " + tweetCount);

	let currentPage = 0;
	const pageCount = tweetCount / 5 + 1;
	const tweets = await searchTweets("소리", 5, currentPage);

	return (
		<div className="h-screen flex justify-center items-start">
			<div className="mx-[10%] min-w-[500px] py-10 px-6 flex flex-col gap-8">
				<div className="text-3xl text-center">💛 Search 💛</div>
				<div className="grid grid-cols-2 gap-2">
					<span>
						<Link href="/">
							<Button text="Go to Home" />
						</Link>
					</span>
					<span>
						<Link href="/profile">
							<Button text="Go to Profile" color="G" />
						</Link>
					</span>
				</div>

				<SearchTweet searchTweets={searchTweets} />

				<div className="flex justify-between gap-5">
					<h2>Latest 5 Tweets</h2>
					<span className="text-gray-400">Total {tweetCount}</span>
				</div>
				<hr className="-mt-8 -mb-5" />
				<div className="flex flex-col gap-3">
					{tweets.map((item) => (
						<div key={item.id}>
							<Link href={`/tweets/${item.id}`}>
								<div className="text-xs border rounded-md p-3 bg-yellow-500 hover:bg-yellow-700 flex justify-between items-center">
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
								<div className="mr-1 flex gap-1 items-center *:flex *:gap-1 *:items-center">
									{item.user.username}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

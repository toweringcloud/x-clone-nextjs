import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/solid";
import {
	ChatBubbleBottomCenterIcon,
	HandThumbUpIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/Button";
import AddTweet from "@/components/AddTweet";

import { getUser, getTweetCount, getTweets, addTweet } from "./actions";

export default async function Home() {
	const user = await getUser();
	console.log("# users : " + user!.username);

	const tweetCount = await getTweetCount();
	console.log("# tweets : " + tweetCount);

	let currentPage = 0;
	const pageCount = tweetCount / 5 + 1;
	const tweets = await getTweets(5, currentPage);

	//-wise sayings (life quotes)
	// http://www.feelpoem.com/bbs/board.php?bo_table=m44&wr_id=711&sfl=mb_id%2C1&stx=dlhhok

	return (
		<div className="h-screen flex justify-center items-start">
			<div className="mx-[10%] min-w-[500px] py-10 px-6 flex flex-col gap-8">
				<div className="text-3xl text-center">💙 Home 💙</div>
				<div className="grid grid-cols-2 gap-2">
					<span>
						<Link href="/profile">
							<Button text="Go to Profile" />
						</Link>
					</span>
					<span>
						<Link href="/search">
							<Button text="Go to Search" color="Y" />
						</Link>
					</span>
				</div>

				<AddTweet action={addTweet} />

				<div className="flex justify-between gap-5">
					<h2>Latest 5 Tweets</h2>
					<span className="text-gray-400">Total {tweetCount}</span>
				</div>
				<hr className="-mt-8 -mb-5" />
				<div className="flex flex-col gap-3">
					{tweets.map((item) => (
						<div key={item.id}>
							<Link href={`/tweets/${item.id}`}>
								<div className="text-xs border rounded-md p-3 bg-sky-500 hover:bg-sky-700 flex justify-between items-center">
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
								<div className="mr-1 flex gap-1 items-center hover:text-sky-700">
									<Link href={`/users/${item.user.username}`}>
										{item.user.username}
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

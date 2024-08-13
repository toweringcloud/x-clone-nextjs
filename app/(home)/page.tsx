import Link from "next/link";
import Button from "@/components/Button";
import { getUser, getTweetCount, getTweets } from "./actions";

export default async function Home() {
	const user = await getUser();
	console.log("# users : " + user!.username);

	const tweetCount = await getTweetCount();
	console.log("# tweets : " + tweetCount);

	let currentPage = 0;
	const pageCount = tweetCount / 5 + 1;
	const tweets = await getTweets(5, currentPage);

	return (
		<div className="flex flex-col gap-10 py-8 px-6 mx-[25%] ">
			<div className="text-3xl text-center pt-[30vh]">💙 Home 💙</div>
			<Link href="/profile">
				<Button text="Go to Profile" />
			</Link>
			<div className="flex justify-between gap-5">
				<h2>Latest 5 Tweets</h2>
				<span className="text-gray-400">Total {tweetCount}</span>
			</div>
			<hr className="-mt-9 -mb-5" />
			<div className="flex flex-col gap-3">
				{tweets.map((item) => (
					<div key={item.id}>
						<Link href={`/tweets/${item.id}`}>
							<div className="text-xs border rounded-md p-3 bg-sky-500 hover:bg-gray-700 flex justify-between items-center">
								<div className="flex text-white w-[80%]">
									{item.tweet}
								</div>
								<div className="text-gray-200 pl-1">
									{item.createdAt.toLocaleTimeString()}
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

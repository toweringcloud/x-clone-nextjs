import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import { UserIcon } from "@heroicons/react/24/solid";

import Button from "@/components/Button";
import { formatToTimeAgo } from "@/libs/utils";

import { getUser, getTweet } from "./actions";

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

	// const tweet = await getTweet(id);
	const tweet: any = await getCachedTweet(id);
	if (!tweet) {
		return notFound();
	}

	return (
		<div className="flex flex-col gap-10 py-8 px-6 mx-[25%]">
			<div className="text-3xl text-center pt-[30vh]">💜 Detail 💜</div>
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
					<span>{formatToTimeAgo(tweet?.createdAt.toString())}</span>
				</div>
			</div>
		</div>
	);
}

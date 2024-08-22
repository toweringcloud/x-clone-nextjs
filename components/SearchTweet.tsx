"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/libs/hooks";

import Button from "@/components/Button";
import Input from "@/components/Input";

interface SearchTweetProps {
	searchTweets: Function;
}

export default function SearchTweet({ searchTweets }: SearchTweetProps) {
	const [input, setInput] = useState("");
	const [debouncedInput, setDebouncedInput] = useDebounce(input, 1000);

	useEffect(() => {
		if (input != "") {
			// setRecoilValue(debouncedInput);
			console.log(input);
		}
	}, [debouncedInput]);

	return (
		<div className="flex flex-col gap-3">
			<Input
				type="text"
				name="keyword"
				required
				placeholder="Input keyword to search"
				onChange={(event) => setInput(event.target.value)}
			/>
			<Button
				text="Search Tweet"
				color="Y"
				onClick={() => searchTweets(debouncedInput, 5, 0)}
			/>
		</div>
	);
}

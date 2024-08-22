"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/libs/hooks";
import { Link } from "next/link";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function SearchTweet() {
	const [input, setInput] = useState("");
	const [debouncedInput, setDebouncedInput] = useDebounce(input, 1000);

	useEffect(() => {
		if (input != "") {
			console.log(input);
			document.querySelector("#search").submit();
		}
	}, [debouncedInput]);

	return (
		<form id="search" action={`/search?keyword=${debouncedInput}`}>
			<div className="flex flex-col gap-3">
				<Input
					type="text"
					name="keyword"
					required
					placeholder="Input keyword to search"
					onChange={(event) => setInput(event.target.value)}
				/>
				<Button text="Search Tweet" color="Y" />
			</div>
		</form>
	);
}

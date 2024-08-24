"use client";

import { useEffect, useState } from "react";
import { useDebounce, useThrottle } from "@/libs/hooks";

import Button from "@/components/Button";
import Input from "@/components/Input";

interface ISearchProps {
	keyword: string;
}

export default function SearchTweet(props: ISearchProps) {
	let keyword = props.keyword || "";
	const [input, setInput] = useState("");
	const debouncedInput = useDebounce(input, 500);

	useEffect(() => {
		if (input != "") handleSubmit();
	}, [debouncedInput]);

	const handleSubmit = useThrottle(() => {
		if (input.length > 1) {
			document.querySelector("#search").submit();
		}
	}, 2000);

	const selectInputValue = () => {
		document.querySelector("#keyword").select();
	};

	return (
		<form
			id="search"
			action={`/search?keyword=${debouncedInput}`}
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-3">
				<Input
					type="text"
					id="keyword"
					name="keyword"
					value={input || keyword}
					placeholder="Input keyword to search"
					onChange={(event) => setInput(event.target.value)}
					onFocus={() => selectInputValue()}
				/>
				<Button
					text="Search Tweet"
					color="Y"
					mode="button"
					onClick={() => handleSubmit()}
				/>
			</div>
		</form>
	);
}

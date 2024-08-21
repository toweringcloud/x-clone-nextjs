"use client";

import { useEffect, useOptimistic, useRef } from "react";
import { useFormState } from "react-dom";

import Button from "@/components/Button";
import Input from "@/components/Input";

interface SearchTweetProps {
	action: Function;
	keyword: string;
}

export default function SearchTweet({ action, keyword }: AddTweetProps) {
	const [state, dispatch] = useFormState(action, null);
	const formRef = useRef<HTMLFormElement>(null);
	const handleReset = () => {
		formRef.current?.reset();
	};

	const [stateVal, reducerFn] = useOptimistic(
		{ keyword },
		(prevState, payload) => ({})
	);

	const onClick = () => {
		//-handle ui action for optimistic response
		reducerFn(undefined);
	};

	useEffect(() => {
		//-handle db action for real response
		handleReset();
	}, [state, keyword]);

	return (
		<form action={dispatch} ref={formRef} className="flex flex-col gap-3">
			<Input
				name="keyword"
				required
				placeholder="Input keyword to search"
				type="text"
				errors={state?.fieldErrors.keyword}
			/>
			<Button text="Search Tweet" color="Y" />
		</form>
	);
}

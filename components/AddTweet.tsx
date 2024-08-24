"use client";

import { useEffect, useOptimistic, useRef } from "react";
import { useFormState } from "react-dom";

import Button from "@/components/Button";
import Input from "@/components/Input";

interface AddTweetProps {
	action: Function;
	tweetId?: number;
	articles?: any;
}

export default function AddTweet({ action, tweetId, articles }: AddTweetProps) {
	const [state, dispatch] = useFormState(action, null);
	const formRef = useRef<HTMLFormElement>(null);
	const handleReset = () => {
		formRef.current?.reset();
	};

	const [stateVal, reducerFn] = useOptimistic(
		{ tweetId, articles },
		(prevState, payload) => ({})
	);

	const onClick = () => {
		//-handle ui action for optimistic response
		reducerFn(undefined);
	};

	useEffect(() => {
		//-handle db action for real response
		handleReset();
	}, [state, articles]);

	return (
		<form action={dispatch} ref={formRef} className="flex flex-col gap-3">
			<Input
				name="tweet"
				required
				placeholder="Add your tweet!"
				type="text"
				errors={state?.fieldErrors.tweet}
			/>
			<Button text="Upload Tweet" color="B" />
		</form>
	);
}

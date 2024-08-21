"use client";

import { useEffect, useOptimistic, useRef } from "react";
import { useFormState } from "react-dom";

import Button from "@/components/Button";
import Input from "@/components/Input";

interface AddCommentProps {
	action: Function;
	tweetId: number;
	comments: any;
}

export default function AddComment({
	action,
	tweetId,
	comments,
}: AddCommentProps) {
	const [state, dispatch] = useFormState(action, null);
	const formRef = useRef<HTMLFormElement>(null);
	const handleReset = () => {
		formRef.current?.reset();
	};

	const [stateVal, reducerFn] = useOptimistic(
		{ tweetId, comments },
		(prevState, payload) => ({})
	);

	const onClick = () => {
		//-handle ui action for optimistic response
		reducerFn(undefined);
	};

	useEffect(() => {
		//-handle db action for real response
		handleReset();
	}, [state, comments]);

	return (
		<form action={dispatch} ref={formRef} className="flex flex-col gap-3">
			<Input
				type="text"
				name="payload"
				required
				placeholder="Add your comment!"
				errors={state?.fieldErrors.payload}
			/>
			<Input type="hidden" name="tweetId" value={tweetId} required />
			<Button text="Upload Comment" color="O" onClick={onClick} />
		</form>
	);
}

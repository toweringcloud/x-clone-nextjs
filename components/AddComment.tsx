"use client";

import { useRef } from "react";
import { useFormState } from "react-dom";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function AddComment({ action, tweetId }: any) {
	const formRef = useRef<HTMLFormElement>(null);
	const [state, dispatch] = useFormState(action, null);

	const handleReset = () => {
		formRef.current?.reset();
	};

	return (
		<form
			action={dispatch}
			ref={formRef}
			className="p-0 flex flex-col gap-3"
		>
			<Input
				name="payload"
				required
				placeholder="Add your comment!"
				type="text"
				// errors={state?.fieldErrors.title}
			/>
			<Input name="tweetId" value={tweetId} required type="hidden" />
			<Button text="Upload Comment" color="O" />
		</form>
	);
}

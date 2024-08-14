"use client";

import { useFormState } from "react-dom";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function AddTweet({ action }: any) {
	const [state, dispatch] = useFormState(action, null);

	return (
		<form action={dispatch} className="p-0 flex flex-col gap-5">
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

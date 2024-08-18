"use client";

import { useFormState } from "react-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

import Input from "@/components/Input";

export default function RemoveComment({ action, tweetId, commentId }: any) {
	const [state, dispatch] = useFormState(action, null);

	return (
		<form action={dispatch} className="p-0 flex flex-col">
			<Input name="tweetId" value={tweetId} required type="hidden" />
			<Input name="commentId" value={commentId} required type="hidden" />
			<button>
				<TrashIcon className="size-5 text-orange-50" />
			</button>
		</form>
	);
}

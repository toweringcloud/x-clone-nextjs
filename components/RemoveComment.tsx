"use client";

import { useFormState } from "react-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function RemoveComment({ action, tweetId, commentId }: any) {
	const [state, dispatch] = useFormState(action, null);

	return (
		<form action={dispatch} className="p-0 flex flex-col">
			<input name="tweetId" value={tweetId} required type="hidden" />
			<input name="commentId" value={commentId} required type="hidden" />
			<button>
				<TrashIcon className="size-4 text-orange-50" />
			</button>
		</form>
	);
}

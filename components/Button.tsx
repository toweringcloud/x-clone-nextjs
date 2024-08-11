"use client";

import { useFormStatus } from "react-dom";
import { cn } from "../libs/utils";

interface FormButtonProps {
	text: string;
	mode?: "submit" | "reset" | "button";
}

export default function Button({ text, mode = "submit" }: FormButtonProps) {
	const { pending } = useFormStatus();
	return (
		<button
			disabled={pending}
			type={mode}
			className={cn(
				"bg-stone-300 rounded-2xl font-semibold after:h-10 p-2 w-full",
				"disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
			)}
		>
			{pending ? "Loading..." : text}
		</button>
	);
}

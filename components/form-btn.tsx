"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
	text: string;
	mode: "submit" | "reset" | "button";
}

export default function FormButton({ text, mode }: FormButtonProps) {
	const { pending } = useFormStatus();
	return (
		<button
			disabled={pending}
			type={mode}
			className="primary-btn h-10 p-2 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
		>
			{pending ? "Loading..." : text}
		</button>
	);
}

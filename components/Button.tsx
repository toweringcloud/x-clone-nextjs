"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "../libs/utils";

interface ButtonProps {
	mode?: "submit" | "reset" | "button";
	text: string;
	color?: string;
}

const setButtonColor = (color: string) => {
	switch (color.toLowerCase()) {
		case "r":
			return "bg-red-300 hover:bg-red-500 text-red-700 hover:text-white";
		case "g":
			return "bg-green-300 hover:bg-green-500 text-green-700 hover:text-white";
		case "b":
			return "bg-blue-300 hover:bg-blue-500 text-blue-700 hover:text-white";
		case "o":
			return "bg-orange-300 hover:bg-orange-500 text-orange-700 hover:text-white";
		case "y":
			return "bg-yellow-300 hover:bg-yellow-500 text-yellow-700 hover:text-white";
		case "v":
			return "bg-violet-300 hover:bg-violet-500 text-violet-700 hover:text-white";
		default:
			return "bg-stone-300 hover:bg-stone-500 text-stone-700 hover:text-white";
	}
};

export default function Button({
	mode = "submit",
	text,
	color = "z",
	...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
	const { pending } = useFormStatus();
	return (
		<button
			disabled={pending}
			type={mode}
			className={cn(
				setButtonColor(color),
				"rounded-2xl font-semibold after:h-10 p-2 w-full",
				"disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
			)}
			{...rest}
		>
			{pending ? "Loading..." : text}
		</button>
	);
}

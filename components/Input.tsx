import { InputHTMLAttributes } from "react";
import { cn } from "../libs/utils";

interface InputProps {
	name: string;
	errors?: string[];
	className?: string;
}

export default function Input({
	name,
	errors = [],
	className,
	...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className="flex flex-col gap-2">
			<input
				name={name}
				className={cn([
					"text-black bg-transparent rounded-2xl w-full h-10 pl-5 placeholder:text-neutral-400",
					"focus:outline-none ring-2 focus:ring-4 transition focus:ring-neutral-500 border-none",
					`${errors.length > 0 ? "ring-red-500" : "ring-neutral-200"}`,
					className,
				])}
				{...rest}
			/>
			{errors.map((error, index) => (
				<span key={index} className="text-red-500 font-medium">
					{error}
				</span>
			))}
		</div>
	);
}

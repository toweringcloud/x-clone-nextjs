import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function slow() {
	await new Promise((resolve) => {
		return setTimeout(resolve, 1000);
	});
}

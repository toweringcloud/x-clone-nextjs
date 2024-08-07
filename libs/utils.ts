import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function slow(second: number) {
	await new Promise((resolve) => {
		return setTimeout(resolve, second * 1000);
	});
}

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

export function formatToTimeAgo(date: string): string {
	const dayInMs = 1000 * 60 * 60 * 24;
	const time = new Date(date).getTime();
	const now = new Date().getTime();
	const diff = Math.round((time - now) / dayInMs);

	const formatter = new Intl.RelativeTimeFormat("ko");
	return formatter.format(diff, "days");
}

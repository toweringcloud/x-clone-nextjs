import { useEffect, useRef, useState } from "react";

export function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timerId);
		};
	}, [value, delay]);

	return debouncedValue;
}

export function useThrottle(callback: Function, delay: number) {
	const lastRun = useRef(Date.now());

	return () => {
		const timeElapsed = Date.now() - lastRun.current;

		if (timeElapsed >= delay) {
			callback();
			lastRun.current = Date.now();
		}
	};
}

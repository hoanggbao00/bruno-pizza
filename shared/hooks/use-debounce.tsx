import { useCallback, useRef } from 'react';

function useDebounce(callback: (...args: any[]) => void, delay: number) {
	const timerRef = useRef<number | null>(null);

	const debouncedCallback = useCallback(
		(...args: any[]) => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
			timerRef.current = window.setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);

	return debouncedCallback;
}

export default useDebounce;

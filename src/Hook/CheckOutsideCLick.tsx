import { useEffect } from "react";

export function useOutsideClick(
    ref: React.RefObject<HTMLInputElement | null>,
    callback: () => void
) {
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (!ref.current?.contains(e.target as Node)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [ref, callback]);


}

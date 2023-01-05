import { maybe } from "@mzawadie/ui-kit/utils/tsUtils";
import React from "react";

export const useHandlerWhenClickedOutside = (callback: () => void) => {
    const elementRef = React.useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (maybe(() => elementRef.current && e.target, null)) {
            if (elementRef.current!.contains(e.target as Element)) {
                return;
            }
            callback();
        }
    };

    const setElementRef = () => elementRef;

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return {
        setElementRef,
    };
};

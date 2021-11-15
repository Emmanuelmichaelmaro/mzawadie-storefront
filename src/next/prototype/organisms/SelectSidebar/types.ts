import { ISelectOptions } from "@next/types";
import React from "react";

export interface IProps {
    title: React.ReactNode;
    options: ISelectOptions[];
    selectedOptions?: string[];
    disabledOptions?: string[];
    hide: () => void;
    onSelect: (value: string) => void;
    show: boolean;
    target?: HTMLElement | null;
    footerTitle?: string;
    onClickFooter?: () => void;
    /**
     * Used as marker for writing e2e tests. Use unique ID to differentiate
     * multiple elements in the same view from each other
     */
    testingContextId?: string;
}

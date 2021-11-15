import { IFilterAttribute } from "@next/types";
import React from "react";

export interface IProps {
    title?: React.ReactNode;
    name: string;
    values: IFilterAttribute[];
    valuesShowLimit?: boolean;
    valuesShowLimitNumber?: number;
    onValueClick: (value: IFilterAttribute) => void;
}

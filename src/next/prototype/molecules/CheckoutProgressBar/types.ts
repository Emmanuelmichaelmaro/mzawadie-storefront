import { ICheckoutStep } from "@next/types";

export interface ICheckoutProgressBarProps {
    steps: ICheckoutStep[];
    activeStep: number;
}

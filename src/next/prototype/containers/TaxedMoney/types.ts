import { ITaxedMoney } from "@next/types";

export interface IProps {
    taxedMoney?: ITaxedMoney | null;
    defaultValue?: string;
}

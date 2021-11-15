import { ISelect } from "@mzawadie/prototype/atoms";
import { IFormError } from "@next/types";

export interface IProps extends ISelect {
    label: string;
    inputProps?: object;
    errors?: IFormError[];
}

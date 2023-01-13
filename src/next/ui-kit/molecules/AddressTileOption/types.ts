import { IAddressWithAddressType } from "@next/types";
import React from "react";

export interface IAddressTileOptionProps {
    id: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    address: IAddressWithAddressType;
    inputName: string;
    testingContext?: string;
}

import { IAddressWithAddressType } from "@next/types";

export interface IAddressTileProps {
    onEdit: () => void;
    onRemove: () => void;
    setDefault: (arg0: string) => void;
    address: IAddressWithAddressType;
}

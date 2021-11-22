import { IImage, ITaxedMoney } from "@next/types";

export interface IProps {
    index?: number;
    name: string;
    sku: string;
    quantity: number;
    price: ITaxedMoney;
    thumbnail?: IImage;
}

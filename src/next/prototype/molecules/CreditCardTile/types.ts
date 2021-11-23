import { CCProviders } from "@mzawadie/prototype/atoms";

export interface ICreditCardTileProps {
    nameOnCard: string;
    expirationDate: string;
    last4Digits: number;
    creditCardProvider: CCProviders;
}
export interface IProps extends ICreditCardTileProps {
    onRemove?: () => void;
}

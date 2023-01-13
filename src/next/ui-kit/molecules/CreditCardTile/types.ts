import { CCProviders } from "@mzawadie/ui-kit/atoms";

export interface ICreditCardTileProps {
    nameOnCard: string;
    expirationDate: string;
    last4Digits: number;
    creditCardProvider: CCProviders;
}
export interface IProps extends ICreditCardTileProps {
    onRemove?: () => void;
}

export type CCProviders = "visa" | "maestro" | "mastercard" | "jcb" | "discover" | "amex";

export interface ICreditCardIconProps {
    creditCardProvider: CCProviders;
}

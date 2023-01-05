import { ShopConfig } from "@mzawadie/ui-kit/utils/ssr";
import { createContext } from "react";

export const defaultCountry = {
    __typename: "CountryDisplay" as "CountryDisplay",
    code: "US",
    country: "United States of America",
};

export const defaultContext: ShopConfig["shopConfig"] = {
    __typename: "Shop",
    countries: [],
    defaultCountry,
    displayGrossPrices: true,
};

export const ShopContext = createContext<ShopConfig["shopConfig"]>(defaultContext);

ShopContext.displayName = "ShopContext";

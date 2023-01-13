// @ts-nocheck
import amexImg from "images/amex.svg";
import discoverImg from "images/discover.svg";
import jcbImg from "images/jcb.svg";
import maestroImg from "images/maestro.svg";
import mastercardImg from "images/mastercard.svg";
import visaImg from "images/visa.svg";
import React from "react";
import { ReactSVG } from "react-svg";

import * as S from "./styles";
import { ICreditCardIconProps } from "./types";

const providers = new Map();

providers.set("visa", visaImg);
providers.set("maestro", maestroImg);
providers.set("mastercard", mastercardImg);
providers.set("amex", amexImg);
providers.set("jcb", jcbImg);
providers.set("discover", discoverImg);

export const CreditCardIcon: React.FC<ICreditCardIconProps> = ({ creditCardProvider }: ICreditCardIconProps) => {
    return (
        <S.CreditCardIcon>
            {providers.has(creditCardProvider) && <ReactSVG src={providers.get(creditCardProvider)} />}
        </S.CreditCardIcon>
    );
};
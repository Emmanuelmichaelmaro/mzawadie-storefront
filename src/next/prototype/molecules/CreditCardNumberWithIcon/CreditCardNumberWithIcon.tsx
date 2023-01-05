import { CreditCardIcon } from "@mzawadie/ui-kit/atoms";
import React from "react";

import * as S from "./styles";
import { ICreditCardNumberWithIconProps } from "./types";

export const CreditCardNumberWithIcon: React.FC<ICreditCardNumberWithIconProps> = ({ creditCardProvider, last4Digits }) => {
    return (
        <div>
            <CreditCardIcon creditCardProvider={creditCardProvider} />
            <S.Wrapper>XXXX XXXX XXXX {last4Digits}</S.Wrapper>
        </div>
    );
};

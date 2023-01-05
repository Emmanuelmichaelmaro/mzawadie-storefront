import { AccountTabTiles } from "@mzawadie/ui-kit/molecules";
import React from "react";

import * as S from "./styles";

export const AccountTab: React.FC = () => {
    return (
        <S.Wrapper>
            <AccountTabTiles />
        </S.Wrapper>
    );
};

import { AccountTabTiles } from "@mzawadie/prototype/molecules";
import React from "react";

import * as S from "./styles";

export const AccountTab: React.FC = () => {
    return (
        <S.Wrapper>
            <AccountTabTiles />
        </S.Wrapper>
    );
};

import React from "react";

import * as S from "./styles";
import { IAttributeProps } from "./types";

/**
 * The attribute
 */
export const Attribute: React.FC<IAttributeProps> = ({
    description,
    attributeValue,
    testingContext,
}: IAttributeProps) => {
    return (
        <S.Wrapper>
            <S.Description>{description}</S.Description>
            <div data-test={testingContext}>{attributeValue}</div>
        </S.Wrapper>
    );
};

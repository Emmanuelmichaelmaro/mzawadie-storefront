import { Address } from "@mzawadie/prototype/atoms";
import React from "react";

import * as S from "./styles";
import { IAddressTileOptionProps } from "./types";

/**
 * Address tile option.
 */
const AddressTileOption: React.FC<IAddressTileOptionProps> = ({
    id,
    inputName,
    address,
    onChange,
    checked,
    testingContext,
    ...props
}: IAddressTileOptionProps) => {
    return (
        <S.Label
            checked={!!checked}
            data-test={testingContext ? `${testingContext}AddressTile` : `addressTile`}
            data-test-id={id}
        >
            <Address {...address} />

            <S.Input
                {...props}
                type="radio"
                name={inputName}
                value={id}
                checked={checked}
                onChange={onChange}
            />
        </S.Label>
    );
};

export { AddressTileOption };

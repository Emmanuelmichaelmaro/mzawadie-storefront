import { commonMessages } from "@mzawadie/core";
import React from "react";
import { FormattedMessage } from "react-intl";

import * as S from "./styles";
import { IAddressSummaryProps } from "./types";

/**
 * Address summary
 */
const AddressSummary: React.FC<IAddressSummaryProps> = ({ address, email }: IAddressSummaryProps) => {
    if (address) {
        return (
            <S.Wrapper data-test="addressTile">
                <strong>{`${address.firstName} ${address.lastName}`}</strong>
                <br />
                {address.companyName && (
                    <>
                        {address.companyName} <br />
                    </>
                )}
                {address.streetAddress1}
                {address.streetAddress2 && <>, {address.streetAddress2}</>}, {address.city},{" "}
                {address.postalCode}
                {address.countryArea && <>, {address.countryArea}</>}, {address.country?.country}
                <br />
                {address.phone && (
                    <>
                        <FormattedMessage
                            {...commonMessages.phoneNumber}
                            values={{ phone: address.phone }}
                        />{" "}
                        <br />
                    </>
                )}
                {email && (
                    <>
                        <FormattedMessage {...commonMessages.showEmail} values={{ email }} /> <br />{" "}
                        <br />
                    </>
                )}
            </S.Wrapper>
        );
    }
    if (email) {
        return <S.Wrapper data-test="emailTile">{email}</S.Wrapper>;
    }
    return null;
};

export { AddressSummary };

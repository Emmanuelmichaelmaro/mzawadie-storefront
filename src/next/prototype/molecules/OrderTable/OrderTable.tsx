import { commonMessages, generateProductUrl, paths, translateOrderStatus } from "@mzawadie/core";
import { TaxedMoney } from "@mzawadie/prototype/containers";
import { generateGuestOrderDetailsUrl } from "@next/utils/core";
import Link from "next/link";
import React from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import Media from "react-media";
import { ThemeContext } from "styled-components";

import { Thumbnail } from "..";
import * as S from "./styles";
import { IOrderTableProps } from "./types";

const header = (matches: boolean) => (
    <S.HeaderRow>
        <S.IndexNumber>
            <FormattedMessage defaultMessage="Index Number" />
        </S.IndexNumber>

        {matches && (
            <>
                <S.ProductsOrdered>
                    <FormattedMessage defaultMessage="Products Ordered" />
                </S.ProductsOrdered>

                <S.DateOfOrder>
                    <FormattedMessage defaultMessage="Date of Order" />
                </S.DateOfOrder>

                <S.Value>
                    <FormattedMessage defaultMessage="Value" />
                </S.Value>
            </>
        )}

        <S.Status>
            <FormattedMessage {...commonMessages.status} />
        </S.Status>
    </S.HeaderRow>
);

export const OrderTable: React.FC<IOrderTableProps> = ({ orders, isGuest }: IOrderTableProps) => {
    const theme = React.useContext(ThemeContext);
    const intl = useIntl();

    return (
        <S.Wrapper>
            <Media
                query={{
                    minWidth: theme.breakpoints.largeScreen,
                }}
            >
                {(matches: boolean) => {
                    return (
                        <>
                            <S.Row>{header(matches)}</S.Row>
                            {orders.map(({ created, token, number, lines, total, statusDisplay }) => {
                                const date = new Date(created);

                                return (
                                    <Link
                                        href={
                                            isGuest
                                                ? generateGuestOrderDetailsUrl(token)
                                                : paths.accountOrderDetail
                                        }
                                        key={number!}
                                        passHref
                                    >
                                        <S.Row
                                            data-test="orderEntry"
                                            data-test-id={number!}
                                            key={number!}
                                        >
                                            <S.IndexNumber>{number!}</S.IndexNumber>

                                            {matches ? (
                                                <>
                                                    <S.ProductsOrdered>
                                                        {lines.slice(0, 5).map((line) => (
                                                            <Link
                                                                href={generateProductUrl(
                                                                    line!.variant!.product.id,
                                                                    line!.variant!.product.slug
                                                                )}
                                                                key={line!.variant!.product.id}
                                                            >
                                                                <a>
                                                                    <Thumbnail source={line!} />
                                                                </a>
                                                            </Link>
                                                        ))}
                                                    </S.ProductsOrdered>

                                                    <S.DateOfOrder>
                                                        <FormattedDate value={date} />
                                                    </S.DateOfOrder>

                                                    <S.Value>
                                                        <TaxedMoney taxedMoney={total} />
                                                    </S.Value>
                                                </>
                                            ) : (
                                                ""
                                            )}

                                            <S.Status>
                                                {translateOrderStatus(statusDisplay!, intl)}
                                            </S.Status>
                                        </S.Row>
                                    </Link>
                                );
                            })}
                        </>
                    );
                }}
            </Media>
        </S.Wrapper>
    );
};

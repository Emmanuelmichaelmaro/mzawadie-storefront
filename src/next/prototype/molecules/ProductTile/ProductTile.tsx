import { TaxedMoney } from "@mzawadie/prototype/containers";
import { Thumbnail } from "@mzawadie/prototype/molecules";
import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTile: React.FC<IProps> = ({ product }: IProps) => {
    const price =
        product.pricing && product.pricing.priceRange && product.pricing.priceRange.start
            ? product.pricing.priceRange.start
            : undefined;

    return (
        <S.Wrapper>
            <S.Title data-test="productTile">{product.name}</S.Title>

            <S.Price data-test="productPrice">
                <TaxedMoney taxedMoney={price} />
            </S.Price>

            <S.Image data-test="productThumbnail">
                <Thumbnail source={product} />
            </S.Image>
        </S.Wrapper>
    );
};

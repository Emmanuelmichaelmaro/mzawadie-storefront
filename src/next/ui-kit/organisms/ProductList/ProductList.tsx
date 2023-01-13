import { generateProductUrl, paths } from "@mzawadie/core";
import { Button, Loader } from "@mzawadie/ui-kit/atoms";
import { ProductTile } from "@mzawadie/ui-kit/molecules";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductList: React.FC<IProps> = ({
    products,
    canLoadMore = false,
    loading = false,
    testingContextId,
    onLoadMore = () => null,
}) => (
    <>
        <S.List data-test="productList" data-test-id={testingContextId}>
            {products.map((product) => {
                const { id, slug, name } = product;
                return (
                    slug &&
                    name && (
                        <Link href={generateProductUrl(id, slug)} key={slug}>
                            <a>
                                <ProductTile product={product} />
                            </a>
                        </Link>
                    )
                );
            })}
        </S.List>
        <S.Loader>
            {loading ? (
                <Loader />
            ) : (
                canLoadMore && (
                    <Button testingContext="loadMoreProductsButton" color="secondary" onClick={onLoadMore}>
                        <FormattedMessage defaultMessage="More +" />
                    </Button>
                )
            )}
        </S.Loader>
    </>
);

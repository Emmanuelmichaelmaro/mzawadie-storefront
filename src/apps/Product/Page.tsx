// @ts-nocheck
import { generateCategoryUrl, generateProductUrl } from "@mzawadie/core";
import { ProductDetails } from "@mzawadie/sdk/lib/src/fragments/gqlTypes/ProductDetails";
import { ProductDescription } from "@mzawadie/ui-kit/molecules";
import { ProductGallery } from "@mzawadie/ui-kit/organisms";
import AddToCartSection from "@mzawadie/ui-kit/organisms/AddToCartSection";
import { smallScreen } from "@mzawadie/ui-kit/styles/constants";
import classNames from "classnames";
import React from "react";
import Media from "react-media";

import { Breadcrumbs, OverlayContext, OverlayTheme, OverlayType } from "../../components";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";
import styles from "./scss/index.module.scss";
import { IProps } from "./types";

const populateBreadcrumbs = (product: ProductDetails) => [
    {
        link: generateCategoryUrl(product.category?.id, product.category.slug),
        value: product.category.name,
    },
    {
        link: generateProductUrl(product.id, product.slug),
        value: product.name,
    },
];

const Page: React.FC<
    IProps & {
        queryAttributes: Record<string, string>;
        onAttributeChangeHandler: (slug: string | null, value: string) => void;
    }
> = ({ add, product, items, queryAttributes, onAttributeChangeHandler }) => {
    const overlayContext = React.useContext(OverlayContext);

    const productGallery: React.RefObject<HTMLDivElement> = React.useRef();

    const [variantId, setVariantId] = React.useState("");

    const getImages = () => {
        if (product.variants && variantId) {
            const variant = product.variants.find((variant) => variant.id === variantId);

            if (variant?.images.length > 0) {
                return variant.images;
            }
        }

        return product.images;
    };

    const handleAddToCart = (variantId, quantity) => {
        add(variantId, quantity);
        overlayContext.show(OverlayType.cart, OverlayTheme.right);
    };

    const addToCartSection = (
        <AddToCartSection
            items={items}
            productId={product.id}
            name={product.name}
            productVariants={product.variants}
            productPricing={product.pricing}
            queryAttributes={queryAttributes}
            setVariantId={setVariantId}
            variantId={variantId}
            onAddToCart={handleAddToCart}
            onAttributeChangeHandler={onAttributeChangeHandler}
            isAvailableForPurchase={product.isAvailableForPurchase}
            availableForPurchase={product.availableForPurchase}
        />
    );

    return (
        <div className={styles.product__page}>
            <div className={styles.container}>
                <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
            </div>

            <div className={styles.container}>
                <div className={styles.product__page__product}>
                    {/*<script className="structured-data-list" type="application/ld+json">*/}
                    {/*    {structuredData(product)}*/}
                    {/*</script>*/}

                    <Media query={{ maxWidth: smallScreen }}>
                        {(matches) =>
                            matches ? (
                                <>
                                    <GalleryCarousel images={getImages()} />

                                    <div className={styles.product__page__product__info}>{addToCartSection}</div>
                                </>
                            ) : (
                                <>
                                    <div className={styles.product__page__product__gallery} ref={productGallery}>
                                        <ProductGallery images={getImages()} />
                                    </div>

                                    <div className={styles.product__page__product__info}>
                                        <div className={classNames([styles.product__page__product__info__fixed])}>
                                            {addToCartSection}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </Media>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.product__page__product__description}>
                    <ProductDescription description={product.description} attributes={product.attributes} />
                </div>
            </div>

            <OtherProducts products={product.category.products.edges} />
        </div>
    );
};

export default Page;

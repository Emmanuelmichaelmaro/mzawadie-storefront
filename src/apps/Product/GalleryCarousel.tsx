// @ts-nocheck
import noPhotoImg from "@images/no-photo.svg";
import Carousel from "@mzawadie/components/Carousel";
import { CachedImage } from "@mzawadie/ui-kit/molecules";
import { ProductDetails_images } from "@saleor/sdk/lib/fragments/gqlTypes/ProductDetails";
import * as React from "react";

import styles from "./scss/index.module.scss";

const GalleryCarousel: React.FC<{
    images: ProductDetails_images[];
}> = ({ images }) => (
    <div className={styles.product__page__product__gallery}>
        <Carousel
            renderCenterLeftControls={() => null}
            renderCenterRightControls={() => null}
            renderBottomCenterControls={(props: any) => {
                const indexes = [];

                for (let i = 0; i < props.slideCount; i++) {
                    indexes.push(i);
                }

                return (
                    <ul className={styles.product__page__product__gallery__nav}>
                        {indexes.map((index) => (
                            <li
                                key={index}
                                onClick={props.goToSlide.bind(null, index)}
                                className={props.currentSlide === index ? `${styles.active}` : ""}
                            >
                                <span />
                            </li>
                        ))}
                    </ul>
                );
            }}
        >
            {images.map((image) => (
                <CachedImage url={image.url || noPhotoImg} key={image.id}>
                    <img src={noPhotoImg} alt="#FIXME" />
                </CachedImage>
            ))}
        </Carousel>
    </div>
);

export default GalleryCarousel;

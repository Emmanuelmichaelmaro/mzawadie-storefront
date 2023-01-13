import { ProductDetails_images } from "@mzawadie/sdk/lib/src/fragments/gqlTypes/ProductDetails";
import { CachedImage } from "@mzawadie/ui-kit/molecules";
import * as React from "react";

import { Carousel } from "../../components";
import noPhotoImg from "../../images/no-photo.svg";
import styles from "./scss/index.module.scss";

const GalleryCarousel: React.FC<{
    images: ProductDetails_images[];
}> = ({ images }) => (
    <div className={styles.product__page__product__gallery}>
        <Carousel
            renderCenterLeftControls={() => null}
            renderCenterRightControls={() => null}
            renderBottomCenterControls={(props) => {
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

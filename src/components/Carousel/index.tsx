// @ts-nocheck
import { largeScreen as mediumScreen, smallScreen } from "@next/styles/constants";
import NukaCarousel, { CarouselProps } from "nuka-carousel";
import * as React from "react";
import Media from "react-media";
import { ReactSVG } from "react-svg";

import styles from "./scss/index.module.scss";

interface CarouselType extends CarouselProps {
    children: React.ReactNode;
}

const Carousel: React.SFC<CarouselType> = ({ children, ...rest }) => {
    const settings = {
        className: [styles.carousel],
        renderBottomCenterControls: () => null,
        renderCenterLeftControls: ({ previousSlide, currentSlide }: any) =>
            currentSlide !== 0 ? (
                <div onClick={previousSlide} className={`${styles.carousel__control} ${styles.carousel__control__left}`}>
                    <ReactSVG src="../../images/carousel-arrow.svg" />
                </div>
            ) : null,
        renderCenterRightControls: ({ nextSlide, currentSlide, slideCount, slidesToShow }: any) =>
            slideCount - slidesToShow !== currentSlide ? (
                <div onClick={nextSlide} className={`${styles.carousel__control} ${styles.carousel__control__right}`}>
                    <ReactSVG src="../../images/carousel-arrow.svg" />
                </div>
            ) : null,
        ...rest,
    };

    return (
        <>
            <Media query={{ maxWidth: smallScreen }}>
                {(matches) =>
                    matches ? (
                        <NukaCarousel slidesToShow={1} slidesToScroll={1} {...settings}>
                            {children}
                        </NukaCarousel>
                    ) : (
                        <Media query={{ maxWidth: mediumScreen }}>
                            {(matches) =>
                                matches ? (
                                    <NukaCarousel slidesToShow={2} slidesToScroll={2} {...settings}>
                                        {children}
                                    </NukaCarousel>
                                ) : (
                                    <NukaCarousel slidesToShow={4} slidesToScroll={4} {...settings}>
                                        {children}
                                    </NukaCarousel>
                                )
                            }
                        </Media>
                    )
                }
            </Media>
        </>
    );
};

export default Carousel;

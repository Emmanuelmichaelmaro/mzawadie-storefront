// @ts-nocheck
import { styled } from "@next/styles";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductGallery } from "./index";
import { eightImages, oneImage, threeImages } from "./fixtures";

const Container = styled.div``;
storiesOf("@mzawadie/prototype/organisms/ProductGallery", module)
    .addParameters({ component: ProductGallery })
    .add("default", () => <ProductGallery images={oneImage} />)
    .add("three Images", () => (
        <Container>
            <ProductGallery images={threeImages} />
        </Container>
    ))
    .add("eight Images", () => <ProductGallery images={eightImages} />);

// @ts-nocheck
import { styled } from "@mzawadie/ui-kit/styles";
import { storiesOf } from "@storybook/react";
import React from "react";

import { eightImages, oneImage, threeImages } from "./fixtures";
import { ProductGallery } from "./index";

const Container = styled.div``;

storiesOf("@mzawadie/ui-kit/organisms/ProductGallery", module)
    .addParameters({ component: ProductGallery })
    .add("default", () => <ProductGallery images={oneImage} />)
    .add("three Images", () => (
        <Container>
            <ProductGallery images={threeImages} />
        </Container>
    ))
    .add("eight Images", () => <ProductGallery images={eightImages} />);

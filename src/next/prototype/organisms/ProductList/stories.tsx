import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { PRODUCTS } from "./fixtures";
import { ProductList } from "./index";

storiesOf("@mzawadie/prototype/organisms/ProductList", module)
    .addParameters({ component: ProductList })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <ProductList
            products={PRODUCTS}
            canLoadMore
            loading={false}
            onLoadMore={() => null}
            testingContextId="testCategory"
        />
    ));

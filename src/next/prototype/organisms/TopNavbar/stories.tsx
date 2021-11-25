import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { TopNavbar } from ".";

// tslint:disable:object-literal-sort-keys
const items = [
    {
        id: "TWVudUl0ZW06Mjcx",
        name: "Accessories",
        category: {
            id: "Q2F0ZWdvcnk6Nw==",
            name: "Accessories",
            slug: "accessories",
            __typename: "Category",
        },
        url: null,
        collection: null,
        page: null,
        parent: null,
        __typename: "MenuItem",
        children: [
            {
                id: "123",
                name: "Subcategory I",
                category: {
                    id: "Q2F0ZWdvcnk6Nw==",
                    name: "Accessories",
                    slug: "accessories",
                    __typename: "Category",
                },
                url: null,
                collection: null,
                page: null,
                parent: null,
                __typename: "MenuItem",
                children: [
                    {
                        id: "TWVudUl0ZW01Mjcx",
                        name: "Subsubcategory I",
                        slug: "subsubcategoryi",
                        category: {
                            id: "Q2F0ZWdvcnk6Nw==",
                            name: "Accessories",
                            slug: "accessories",
                            __typename: "Category",
                        },
                    },
                ],
            },
            {
                id: "TWVudUl0ZW01Mjcx",
                name: "Subcategory II",
                slug: "subcategoryii",
                category: {
                    id: "Q2F0ZWdvcnk6Nw==",
                    name: "Accessories",
                    slug: "accessories",
                    __typename: "Category",
                },
                url: null,
                collection: null,
                page: null,
                parent: null,
                __typename: "MenuItem",
                children: [],
            },
        ],
    },
    {
        id: "TWVudUl0ZW06Mjcy",
        name: "Groceries",
        category: {
            id: "Q2F0ZWdvcnk6OA==",
            name: "Groceries",
            slug: "groceries",
            __typename: "Category",
        },
        url: null,
        collection: null,
        page: null,
        parent: null,
        __typename: "MenuItem",
        children: [],
    },
    {
        id: "TWVudUl0ZW06Mjcz",
        name: "Apparel",
        category: {
            id: "Q2F0ZWdvcnk6OQ==",
            name: "Apparel",
            slug: "apparel",
            __typename: "Category",
        },
        url: null,
        collection: null,
        page: null,
        parent: null,
        __typename: "MenuItem",
        children: [],
    },
];

storiesOf("@mzawadie/prototype/organisms/TopNavbar", module)
    .addParameters({ component: TopNavbar })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <TopNavbar items={items} />);

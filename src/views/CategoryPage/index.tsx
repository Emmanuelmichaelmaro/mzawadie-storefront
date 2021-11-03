// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Query } from "@apollo/client/react/components";
import React from "react";

import { Breadcrumbs, ProductsList } from "../../components";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { getDBIdFromGraphqlId, getGraphqlIdFromDBId, slugify } from "../../core/utils";
import { GET_CATEGORY_AND_ATTRIBUTES } from "./queries";
import "./scss/index.scss";

interface AttributesType {
    [x: string]: string[];
}

class CategoryPage extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.state = { attributes: {}, pageSize: PRODUCTS_PER_PAGE, sortBy: "" };
    }

    onFltersChange = (filters) => {
        this.setState(filters);
    };

    formatBreadcrumbs = (category) => {
        let breadcrumbs = [
            {
                link: `/category/${slugify(category.name)}/${getDBIdFromGraphqlId(
                    category.id,
                    "Category"
                )}/`,
                value: category.name,
            },
        ];

        if (category.ancestors.edges.length > 0) {
            const ancestorsList = category.ancestors.edges.map(({ node: ancestor }) => ({
                link: `/category/${slugify(ancestor.name)}/${getDBIdFromGraphqlId(
                    ancestor.id,
                    "Category"
                )}/`,
                value: ancestor.name,
            }));
            breadcrumbs = ancestorsList.concat(breadcrumbs);
        }

        return breadcrumbs;
    };

    convertToAttributeScalar = (attributes: AttributesType) => {
        const attributesArray = [];
        Object.entries(attributes).forEach(([key, value]) => {
            value.forEach((attribute) =>
                attributesArray.push(
                    `${key.toLowerCase().replace(" ", "-")}:${attribute.toLowerCase()}`
                )
            );
        });
        return attributesArray;
    };

    render() {
        return (
            <Query
                query={GET_CATEGORY_AND_ATTRIBUTES}
                variables={{
                    ...this.state,
                    attributes: this.convertToAttributeScalar(this.state.attributes),
                    id: getGraphqlIdFromDBId(this.props.match.params.id, "Category"),
                }}
            >
                {({ loading, error, data }) => {
                    if (
                        loading &&
                        Object.keys(this.state.attributes).length === 0 &&
                        !this.state.sortBy
                    ) {
                        return "Loading";
                    }

                    if (error) {
                        return `Error!: ${error}`;
                    }

                    return (
                        <div className="category">
                            <div
                                className="category__header"
                                style={{
                                    backgroundImage: `url(${data.category.backgroundImage.url})`,
                                }}
                            >
                                <span className="category__header__title">
                                    <h1>{data.category.name}</h1>
                                </span>
                            </div>

                            <div className="container">
                                <Breadcrumbs breadcrumbs={this.formatBreadcrumbs(data.category)} />
                            </div>

                            <ProductsList
                                products={data.category.products}
                                loading={loading}
                                filters={this.state}
                                attributes={data.attributes.edges.map((edge) => edge.node)}
                                onFltersChange={this.onFltersChange}
                            />
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default CategoryPage;

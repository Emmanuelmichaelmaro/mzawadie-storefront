/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePageProducts
// ====================================================

export interface HomePageProducts_shop {
    __typename: "Shop";
    description: string | null;
    name: string;
}

export interface HomePageProducts_categories_edges_node_backgroundImage {
    __typename: "Image";
    url: string;
}

export interface HomePageProducts_categories_edges_node {
    __typename: "Category";
    id: string;
    name: string;
    slug: string;
    backgroundImage: HomePageProducts_categories_edges_node_backgroundImage | null;
}

export interface HomePageProducts_categories_edges {
    __typename: "CategoryCountableEdge";
    node: HomePageProducts_categories_edges_node;
}

export interface HomePageProducts_categories {
    __typename: "CategoryCountableConnection";
    edges: HomePageProducts_categories_edges[];
}

export interface HomePageProducts {
    shop: HomePageProducts_shop;
    categories: HomePageProducts_categories | null;
}

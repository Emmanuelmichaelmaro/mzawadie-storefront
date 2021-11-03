import { ssrMode } from "./constants";

export const META_DEFAULTS = {
    custom: [],
    description:
        "Open-source PWA storefront built with Mzawadie's e-commerce GraphQL API. Written with React and TypeScript.",
    image: `${
        !ssrMode ? window.location.origin : ""
    }${require("../images/logo.svg")}`,
    title: "Demo PWA Storefront – Mzawadie Commerce",
    type: "website",
    url: !ssrMode ? window.location.origin : "",
};

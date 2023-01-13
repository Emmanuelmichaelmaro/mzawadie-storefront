import { ssrMode } from "./constants";
import { generatePageUrl } from "./utils";

export const META_DEFAULTS = {
    custom: [],
    description:
        "Open-source PWA storefront built with Mzawadie's e-commerce GraphQL API. Written with React and TypeScript.",
    image: `${!ssrMode ? window.location.origin : ""}${require("../images/logo.svg")}`,
    title: "Demo PWA Storefront – Mzawadie Commerce",
    type: "website",
    url: !ssrMode ? window.location.origin : "",
};

export const BASE_URL = "/";

export const STATIC_PAGES = [
    {
        label: "About",
        url: generatePageUrl("about"),
    },
];

export const PRODUCTS_PER_PAGE = 8;

export const SUPPORT_EMAIL = "support@example.com";

export const SOCIAL_MEDIA = [
    {
        ariaLabel: "facebook",
        href: "https://www.facebook.com/mirumeelabs/",
        path: require("../images/facebook-icon.svg"),
    },
    {
        ariaLabel: "instagram",
        href: "https://www.instagram.com/mirumeelabs/",
        path: require("../images/instagram-icon.svg"),
    },
    {
        ariaLabel: "twitter",
        href: "https://twitter.com/getsaleor",
        path: require("../images/twitter-icon.svg"),
    },
    {
        ariaLabel: "youtube",
        href: "https://www.youtube.com/channel/UCg_ptb-U75e7BprLCGS4s1g/videos",
        path: require("../images/youtube-icon.svg"),
    },
];

export enum CheckoutStep {
    Address = 1,
    Shipping,
    Payment,
    Review,
}

export const CHECKOUT_STEPS = [
    {
        link: "/checkout/address",
        name: "Address",
        nextActionName: "Continue to Shipping",
        nextStepLink: "/checkout/shipping",
        step: CheckoutStep.Address,
    },
    {
        link: "/checkout/shipping",
        name: "Shipping",
        nextActionName: "Continue to Payment",
        nextStepLink: "/checkout/payment",
        step: CheckoutStep.Shipping,
    },
    {
        link: "/checkout/payment",
        name: "Payment",
        nextActionName: "Continue to Review",
        nextStepLink: "/checkout/review",
        step: CheckoutStep.Payment,
    },
    {
        link: "/checkout/review",
        name: "Review",
        nextActionName: "Place order",
        nextStepLink: "/order-finalized",
        step: CheckoutStep.Review,
    },
];

export const PROVIDERS = {
    DUMMY: {
        label: "Dummy",
    },
    STRIPE: {
        label: "Stripe",
    },
    BRAINTREE: {
        label: "Braintree",
    },
    ADYEN: {
        label: "Adyen",
        script: {
            src: "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js",
            integrity: "sha384-wG2z9zSQo61EIvyXmiFCo+zB3y0ZB4hsrXVcANmpP8HLthjoQJQPBh7tZKJSV8jA",
            crossOrigin: "anonymous",
        },
        style: {
            src: "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.css",
            integrity: "sha384-8ofgICZZ/k5cC5N7xegqFZOA73H9RQ7H13439JfAZW8Gj3qjuKL2isaTD3GMIhDE",
            crossOrigin: "anonymous",
        },
    },
};

declare module "*.jpg";
declare module "*.png";
declare module "*.svg" {
    const content: any;
    export default content;
}

declare interface Window {
    PasswordCredential: any;
    Stripe: any;
    Cypress?: any;
    AdyenCheckout: any;
    version: string;
    __APOLLO_CLIENT__: any;
}

declare interface Navigator {
    credentials: any;
}

declare module ".*/scss/variables.scss" {
    const content: {
        mediumScreen: string;
        smallScreen: string;
    };
    export = content;
}

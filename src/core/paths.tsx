const baseUrl = "/";
const slugUrl = ":slug";

const accountBaseUrl = `${baseUrl}account/`;
const checkoutBaseUrl = `${baseUrl}checkout/`;

export const paths = {
    notFound: `${baseUrl}404`,
    cart: `${baseUrl}cart`,
    category: `${baseUrl}category/${slugUrl}`,
    collection: `${baseUrl}collection/${slugUrl}`,
    guestOrderDetail: `${baseUrl}order-history/:token`,
    home: baseUrl,
    page: `${baseUrl}page/:slug`,
    product: `${baseUrl}product/${slugUrl}`,
    search: `${baseUrl}search`,
    wishlist: `${baseUrl}wishlist`,

    /**
     * Account section
     */
    account: accountBaseUrl,
    accountLogin: `${accountBaseUrl}login`,
    accountConfirm: `${accountBaseUrl}account-confirm`,
    accountPasswordReset: `${accountBaseUrl}reset-password`,
    accountAddressBook: `${accountBaseUrl}address-book`,
    // FIXME: User order should be accessible via order id
    accountOrderDetail: `${accountBaseUrl}order-history/:token`,
    accountOrderHistory: `${accountBaseUrl}order-history`,
    accountOrderFinalized: `${accountBaseUrl}order-finalized`,

    /**
     * Checkout
     */
    checkout: checkoutBaseUrl,
    checkoutAddress: `${checkoutBaseUrl}address`,
    checkoutPayment: `${checkoutBaseUrl}payment`,
    checkoutPaymentConfirm: `${checkoutBaseUrl}payment-confirm`,
    checkoutReview: `${checkoutBaseUrl}review`,
    checkoutShipping: `${checkoutBaseUrl}shipping`,
};

/**
 * Paths which should not be generated at build time.
 */
export const DYNAMIC_REDIRECT_PATHS = [paths.accountOrderDetail, paths.guestOrderDetail];

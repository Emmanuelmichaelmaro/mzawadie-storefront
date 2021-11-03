const baseUrl = "/";
const slugUrl = ":slug";

export const paths = {
    home: baseUrl,
    category: `${baseUrl}category/${slugUrl}`,
    collection: `${baseUrl}collection/${slugUrl}`,
    product: `${baseUrl}product/${slugUrl}`,
};

const getVariantsStructuredData = (variants: any) => {
    const inStock = "https://schema.org/InStock";
    const outOfStock = "https://schema.org/OutOfStock";
    return variants.map((variant: any) => ({
        "@type": "Offer",
        availability: variant.quantityAvailable > 0 ? inStock : outOfStock,
        itemCondition: "https://schema.org/NewCondition",
        price: variant.pricing.price.gross.amount.toFixed(2),
        priceCurrency: variant.pricing.price.gross.currency,
        sku: variant.sku,
    }));
};

export const structuredData = (product: any) => {
    const images = product.images.map((image: any) => new URL(image.url).pathname);
    const { variants } = product;

    return JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        description: !product.seoDescription ? `${product.description}` : `${product.seoDescription}`,
        image: images,
        name: !product.seoTitle ? `${product.name}` : `${product.seoTitle}`,
        offers: getVariantsStructuredData(variants) || "No Offers",
        url: location.href,
    });
};

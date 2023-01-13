import { paths } from "@mzawadie/core";
import urljoin from "url-join";

export const structuredData = (shop: any) => {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        description: shop ? shop.description : "",
        name: shop ? shop.name : "",
        potentialAction: {
            "@type": "SearchAction",
            "query-input": "required name=q",
            target: urljoin(location.href, paths.search, "?q={q}"),
        },
        url: location.href,
    });
};

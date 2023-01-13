import { generateCategoryUrl, generateCollectionUrl, generatePageUrl } from "@mzawadie/core";
import Link from "next/link";
import * as React from "react";
import { MenuItem } from "src/next/gqlTypes/MenuItem";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    item: MenuItem;
}

export const NavLink: React.FC<NavLinkProps> = ({ item, ...props }) => {
    const { name, url, category, collection, page } = item;
    const link = (url: string) => (
        <Link passHref href={url}>
            <a {...props}>{name}</a>
        </Link>
    );

    if (url) {
        return (
            <a href={url} {...props}>
                {name}
            </a>
        );
    } else if (category) {
        return link(generateCategoryUrl(category.id, category.name));
    } else if (collection) {
        return link(generateCollectionUrl(collection.id, collection.name));
    } else if (page) {
        return link(generatePageUrl(page.slug));
    }

    return <span {...props}>{name}</span>;
};

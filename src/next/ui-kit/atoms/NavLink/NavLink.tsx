// TODO: Once used in @next - move utils to @utils
// Use slugs everywhere (they are used partially right now)
// NOTE: This component should only be used for navigation inside application
// For external urls, use different component
import { generateCategoryUrl, generateCollectionUrl, generatePageUrl } from "@mzawadie/ui-kit/utils/core";
import Link from "next/link";
import React from "react";

import * as S from "./styles";
import { INavLinkProps } from "./types";

const getLinkUrl = ({ category, collection, page }: INavLinkProps["item"]) => {
    if (category) {
        return generateCategoryUrl(category.id, category.slug);
    }

    if (collection) {
        return generateCollectionUrl(collection.id, collection.slug);
    }

    if (page) {
        return generatePageUrl(page.slug);
    }
};

export const NavLink: React.FC<INavLinkProps> = ({ item, fullWidth = false, ...props }) => {
    const { name, url, category, collection, page } = item;

    if (url) {
        return (
            <a href={url} {...props}>
                {name}
            </a>
        );
    }

    const linkUrl = getLinkUrl({ category, collection, page });

    return linkUrl ? (
        <Link href={linkUrl} passHref>
            <S.Link activeClassName="navlink-active" fullWidth={fullWidth} {...props}>
                {name}
            </S.Link>
        </Link>
    ) : null;
};

import { commonMessages, generateCategoryUrl, generateCollectionUrl, paths } from "@mzawadie/core";
import { CategoryDetails } from "@mzawadie/sdk/lib/fragments/gqlTypes/CategoryDetails";
import { smallScreen } from "@next/styles/constants";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";

import styles from "./scss/index.module.scss";

export interface Breadcrumb {
    value: string;
    link: string;
}

type BreadcrumbCategory = Pick<CategoryDetails, "__typename" | "id" | "slug" | "name">;

export const extractBreadcrumbs = (category: BreadcrumbCategory, ancestors?: BreadcrumbCategory[]) => {
    const constructLink = ({ id, slug, name, __typename }: BreadcrumbCategory) => ({
        link:
            __typename === "Category" ? generateCategoryUrl(id, slug) : generateCollectionUrl(id, slug),
        value: name,
    });

    let breadcrumbs = [constructLink(category)];

    if (ancestors && ancestors.length) {
        const ancestorsList = ancestors.map((category) => constructLink(category));
        breadcrumbs = ancestorsList.concat(breadcrumbs);
    }

    return breadcrumbs;
};

const getBackLink = (breadcrumbs: Breadcrumb[]) =>
    breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : paths.home;

const Breadcrumbs: React.FC<{
    breadcrumbs: Breadcrumb[];
}> = ({ breadcrumbs }) => (
    <Media
        query={{
            minWidth: smallScreen,
        }}
    >
        {(matches) =>
            matches ? (
                <ul className={styles.breadcrumbs}>
                    <li>
                        <Link href={paths.home}>
                            <a>
                                <FormattedMessage {...commonMessages.home} />
                            </a>
                        </Link>
                    </li>

                    {breadcrumbs.map((breadcrumb, index) => (
                        <li
                            key={`${breadcrumb.value}-${index}`}
                            className={classNames({
                                breadcrumbs__active: index === breadcrumbs.length - 1,
                            })}
                        >
                            <Link href={breadcrumb.link}>
                                <a>{breadcrumb.value}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles.breadcrumbs}>
                    <Link href={getBackLink(breadcrumbs)}>
                        <a>
                            <FormattedMessage defaultMessage="Back" />
                        </a>
                    </Link>
                </div>
            )
        }
    </Media>
);

export default Breadcrumbs;

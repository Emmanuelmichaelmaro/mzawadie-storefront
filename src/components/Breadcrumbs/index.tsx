// @ts-nocheck
import { Category_category } from "@mzawadie/apps/Category/gqlTypes/Category";
import { commonMessages, getDBIdFromGraphqlId, paths, slugify } from "@mzawadie/core";
import { smallScreen } from "@mzawadie/ui-kit/styles/constants";
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

export const extractBreadcrumbs = (category: Category_category) => {
    const constructLink = (item) => ({
        link: [`/category`, `/${slugify(item.name)}`, `/${getDBIdFromGraphqlId(item.id, "Category")}/`].join(""),
        value: item.name,
    });

    // console.log('\x1b[33m%s\x1b[0m', JSON.stringify(category, null, 4));
    let breadcrumbs = [constructLink(category)];

    if (category.ancestors?.edges.length) {
        const ancestorsList = category.ancestors.edges.map((edge) => constructLink(edge.node));
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

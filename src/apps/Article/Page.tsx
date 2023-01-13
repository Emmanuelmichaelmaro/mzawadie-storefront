// @ts-nocheck
import { RichTextEditorContent } from "@mzawadie/ui-kit/atoms";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";

import { Breadcrumb, Breadcrumbs } from "../../components";
import styles from "./scss/index.module.scss";

interface PageNavigationElement {
    active: boolean;
    label: string;
    url: string;
}

interface PageProps {
    breadcrumbs: Breadcrumb[];
    headerImage: string | null;
    navigation: PageNavigationElement[];
    page: {
        contentJson: any;
        title: string;
    };
}
export const Page: React.FC<PageProps> = ({ breadcrumbs, headerImage, navigation, page }) => (
    <div className={styles.article__page}>
        <div
            className={styles.article__page__header}
            style={headerImage ? { backgroundImage: `url(${headerImage})` } : null}
        >
            <span className={styles.article__page__header__title}>
                <h1>{page.title}</h1>
            </span>
        </div>

        <div className="container">
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className={styles.article__page__container}>
                <div className={styles.article__page__navigation}>
                    <ul>
                        {navigation.map((menuElement) => (
                            <li
                                className={classNames({
                                    [`${styles.article__page__navigation__element}`]: true,
                                    [`${styles.article__page__navigation__element}:active`]: menuElement.active,
                                })}
                                key={menuElement.url}
                            >
                                <Link href={menuElement.url}>{menuElement.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.article__page__content}>
                    {page.contentJson && <RichTextEditorContent jsonData={page.contentJson} />}
                </div>
            </div>
        </div>
    </div>
);

export default Page;

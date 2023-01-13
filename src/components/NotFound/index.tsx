import { paths } from "@mzawadie/core";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import Button from "../Button";
import styles from "./scss/index.module.scss";

interface NotFoundProps {
    message?: string;
}

const NotFound: NextPage<NotFoundProps> = () => (
    <div className={styles.not__found__page}>
        <h2 className={styles.not__found__page__header}>
            <FormattedMessage defaultMessage="404" />
        </h2>

        <div className={styles.not__found__page__ruler} />

        <div className={styles.not__found__page__message}>
            <p>
                <FormattedMessage defaultMessage="We can’t seem to find a page you are looking for!" />{" "}
            </p>
            <p>
                <FormattedMessage defaultMessage="You may have mistyped the address or the page may have moved." />{" "}
            </p>
            <p>
                <FormattedMessage defaultMessage="We’re sorry for the error and hope you’ll have a good day." />
            </p>
        </div>

        <div className={styles.not__found__page__button}>
            <Link href={paths.home}>
                <a>
                    <Button testingContext="404pageGotoHomeButton" secondary>
                        <FormattedMessage defaultMessage="Back to home" />
                    </Button>
                </a>
            </Link>
        </div>
    </div>
);

export default NotFound;

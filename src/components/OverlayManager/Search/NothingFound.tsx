import * as React from "react";
import { FormattedMessage } from "react-intl";

import styles from "./scss/index.module.scss";

export const NothingFound: React.FC<{ search: string }> = ({ search }) => {
    return (
        <div className={styles.search__products__notfound}>
            <p className="u-lead u-lead--bold u-uppercase">
                <FormattedMessage
                    defaultMessage="Sorry, but we couldn’t match any search results for: {search}"
                    values={{ search }}
                />
            </p>
            <p>
                <FormattedMessage defaultMessage="Don’t give up - check the spelling, think of something less specific and then use the search bar above." />
            </p>
        </div>
    );
};

export default NothingFound;

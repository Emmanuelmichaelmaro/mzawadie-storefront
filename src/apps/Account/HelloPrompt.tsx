import * as React from "react";

import styles from "./scss/helloPrompts.module.scss";

export interface HelloPromptProps {
    name: string;
}

const HelloPrompt: React.FC<HelloPromptProps> = ({ name }) => {
    return (
        <div className={styles.hello__prompt}>
            <h3>Hello{name !== "" ? `, ${name}!` : "!"}</h3>
            <p>Welcome to your user account</p>
        </div>
    );
};

export default HelloPrompt;

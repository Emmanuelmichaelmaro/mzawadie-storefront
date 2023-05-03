/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import * as React from "react";

import styles from "./scss/index.module.scss";

class MenuDropdown extends React.Component<
    {
        head: React.ReactElement<{}>;
        content: React.ReactElement<{}>;
        suffixClass: string;
    },
    { active: boolean }
> {
    static defaultProps = {
        suffixClass: "",
    };

    constructor(props: any) {
        super(props);
        this.state = { active: false };
    }

    render() {
        return (
            <div
                data-test="userButton"
                className={styles.menu__dropdown}
                onMouseOver={() => this.setState({ active: true })}
                onMouseLeave={() => this.setState({ active: false })}
            >
                {this.props.head}

                <div
                    className={`${styles.menu__dropdown__body}${` ${styles.menu__dropdown__body}${this.props.suffixClass}`}${
                        this.state.active ? `" ${styles.menu__dropdown__body}--visible"` : ""
                    }`}
                >
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default MenuDropdown;

// @ts-nocheck
import closeImg from "@images/x.svg";
import React from "react";
import { ReactSVG } from "react-svg";

import styles from "./scss/index.module.scss";

interface MessageProps {
    title: string | undefined;
    status?: "success" | "error";
    onClose: () => void;
}

const Message: React.FC<MessageProps> = ({ title, status = "neutral", children, onClose }) => (
    <div className={`${styles.message} ${styles.message__status}-${status}`}>
        <p className={styles.message__title}>{title}</p>

        {children ? <div className={styles.message__content}>{children}</div> : null}

        <ReactSVG src={closeImg} className={styles.message__close__icon} onClick={onClose} />
    </div>
);

export default Message;

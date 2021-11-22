// @ts-nocheck
import React from "react";
import { ReactSVG } from "react-svg";

import closeImg from "../../images/x.svg";
import "./scss/index.module.scss";

interface MessageProps {
    title: string | undefined;
    status?: "success" | "error";
    onClose: () => void;
}

const Message: React.FC<MessageProps> = ({ title, status = "neutral", children, onClose }) => (
    <div className={`message message__status-${status}`}>
        <p className="message__title">{title}</p>

        {children ? <div className="message__content">{children}</div> : null}

        <ReactSVG src={closeImg} className="message__close-icon" onClick={onClose} />
    </div>
);

export default Message;

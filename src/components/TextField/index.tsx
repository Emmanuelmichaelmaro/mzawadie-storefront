import React from "react";

import "./scss/index.scss";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    helpText?: string;
    label?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

const TextField: React.SFC<TextFieldProps> = ({
    label = "",
    iconLeft,
    iconRight,
    error,
    helpText,
    ...rest
}) => (
    <div className="input">
        {label ? <span className="input__label">{label}</span> : null}
        {iconLeft ? <span className="input__icon-left">{iconLeft}</span> : null}
        {iconRight ? <span className="input__icon-right">{iconRight}</span> : null}
        <input
            {...rest}
            className={`input__field${error ? " input__field--error" : ""}${
                iconLeft ? " input__field--left-icon" : ""
            }`}
        />
        {error && <span className="input__error">{error}</span>}
        {helpText && <span className="input__help-text">{helpText}</span>}
    </div>
);

export default TextField;

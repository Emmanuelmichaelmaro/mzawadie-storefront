import React from "react";

import { FormError } from "../Form";
import styles from "./scss/index.module.scss";

type Style = "white" | "grey";

interface IClassNameArgs {
    errors?: FormError[];
    iconLeft?: React.ReactNode;
    styleType?: Style;
}

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    errors?: FormError[];
    helpText?: string;
    label?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    styleType?: Style;
}

const generateClassName = ({ errors, iconLeft, styleType }: IClassNameArgs) => {
    const baseClass = styles.input__field;
    const errorsClass = errors && errors.length ? ` ${styles.input__field__error}` : "";
    const iconLeftClass = iconLeft ? ` ${styles.input__field__left__icon}` : "";
    const styleTypeClass = styleType === "grey" ? ` ${styles.input__field__grey}` : "";

    return baseClass.concat(errorsClass, iconLeftClass, styleTypeClass);
};

const TextField: React.FC<TextFieldProps> = ({
    label = "",
    iconLeft,
    iconRight,
    errors,
    helpText,
    styleType = "white" as Style,
    ...rest
}) => (
    <div className={styles.input}>
        {iconLeft ? <span className={styles.input__icon__left}>{iconLeft}</span> : null}

        {iconRight ? <span className={styles.input__icon__right}>{iconRight}</span> : null}

        <div className={styles.input__content}>
            <input {...rest} className={generateClassName({ errors, iconLeft, styleType })} />
            {label ? <span className={styles.input__label}>{label}</span> : null}
        </div>

        {errors && <span className={styles.input__error}>{errors.map((error) => error.message).join(" ")}</span>}

        {helpText && <span className={styles.input__help__text}>{helpText}</span>}
    </div>
);

export default TextField;

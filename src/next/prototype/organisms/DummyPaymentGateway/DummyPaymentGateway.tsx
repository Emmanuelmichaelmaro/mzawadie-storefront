import { Radio } from "@mzawadie/ui-kit/atoms";
import { Formik } from "formik";
import React from "react";

import * as S from "./styles";
import { IDummyPaymentGatewayProps } from "./types";

export const statuses = [
    { token: "charged", label: "Charged" },
    { token: "fully-refunded", label: "Fully refunded" },
    { token: "not-charged", label: "Not charged" },
];

/**
 * Dummy payment gateway.
 */
const DummyPaymentGateway: React.FC<IDummyPaymentGatewayProps> = ({
    processPayment,
    formRef,
    formId,
    initialStatus,
}: IDummyPaymentGatewayProps) => {
    return (
        <Formik
            initialValues={{ status: initialStatus || statuses[0].token }}
            onSubmit={(values, { setSubmitting }) => {
                processPayment(values.status);
                setSubmitting(false);
            }}
        >
            {({ handleChange, handleSubmit, handleBlur, values, isSubmitting, isValid }) => (
                <S.Form id={formId} ref={formRef} onSubmit={handleSubmit} data-test="dummyPaymentGatewayForm">
                    {statuses.map(({ token, label }) => {
                        return (
                            <S.Status key={token}>
                                <Radio
                                    key={token}
                                    type="radio"
                                    name="status"
                                    value={token}
                                    checked={values.status === token}
                                    onChange={handleChange}
                                >
                                    <span>{label}</span>
                                </Radio>
                            </S.Status>
                        );
                    })}
                </S.Form>
            )}
        </Formik>
    );
};

export { DummyPaymentGateway };

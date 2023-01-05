import { IItems, ITotalPrice } from "@mzawadie/sdk/lib/src/api/Cart/types";
import { ICheckout, IPayment } from "@mzawadie/sdk/lib/src/api/Checkout/types";
import { checkIfShippingRequiredForProducts, CheckoutStep } from "@mzawadie/ui-kit/pages/CheckoutPage/utils";
import { isPriceEqual } from "@mzawadie/ui-kit/utils/money";
import { useEffect, useState } from "react";

interface StepState {
    recommendedStep: CheckoutStep;
    maxPossibleStep: CheckoutStep;
}

export const useCheckoutStepState = (
    items?: IItems,
    checkout?: ICheckout,
    payment?: IPayment,
    totalPrice?: ITotalPrice
): StepState => {
    const isShippingRequiredForProducts = checkIfShippingRequiredForProducts(items);

    const isCheckoutPriceEqualPaymentPrice =
        payment?.total && totalPrice?.gross && isPriceEqual(payment.total, totalPrice.gross);

    const getMaxPossibleStep = () => {
        if (!checkout?.id && items) {
            // we are creating checkout during address set up
            return CheckoutStep.Address;
        }

        const isShippingAddressSet = !isShippingRequiredForProducts || !!checkout?.shippingAddress;

        const isBillingAddressSet = !!checkout?.billingAddress;

        const isShippingMethodSet = !isShippingRequiredForProducts || !!checkout?.shippingMethod;

        const isPaymentMethodSet = !!payment?.id && isCheckoutPriceEqualPaymentPrice;

        if (!isShippingAddressSet || !isBillingAddressSet) {
            return CheckoutStep.Address;
        }

        if (!isShippingMethodSet) {
            return CheckoutStep.Shipping;
        }

        if (!isPaymentMethodSet) {
            return CheckoutStep.Payment;
        }

        return CheckoutStep.Review;
    };

    const getRecommendedStep = (newMaxPossibleStep: CheckoutStep) => {
        const isPaymentRecreateRequired = newMaxPossibleStep > CheckoutStep.Shipping && !isCheckoutPriceEqualPaymentPrice;

        if (isPaymentRecreateRequired && isShippingRequiredForProducts) {
            return CheckoutStep.Shipping;
        }

        if (isPaymentRecreateRequired) {
            return CheckoutStep.Payment;
        }

        return newMaxPossibleStep;
    };

    const [maxPossibleStep, setMaxPossibleStep] = useState(getMaxPossibleStep());
    const [recommendedStep, setRecommendedStep] = useState(getRecommendedStep(maxPossibleStep));

    useEffect(() => {
        const newMaxPossibleStep = getMaxPossibleStep();
        const newRecommendedStep = getRecommendedStep(newMaxPossibleStep);

        if (maxPossibleStep !== newMaxPossibleStep) {
            setMaxPossibleStep(newMaxPossibleStep);
        }

        if (recommendedStep !== newRecommendedStep) {
            setRecommendedStep(newRecommendedStep);
        }
    }, [checkout, items, payment, totalPrice]);

    return { recommendedStep, maxPossibleStep };
};

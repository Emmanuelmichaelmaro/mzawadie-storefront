// @ts-nocheck
import { ShopContext } from "@mzawadie/components/ShopProvider/context";
import { checkoutMessages, commonMessages } from "@mzawadie/core";
import { AddressFormModal, AddressGrid } from "@mzawadie/prototype/organisms";
import {
    AccountErrorCode,
    AddressTypeEnum,
    useDefaultUserAddress,
    useDeleteUserAddresss,
} from "@mzawadie/sdk";
import { User } from "@mzawadie/sdk/lib/fragments/gqlTypes/User";
import { getUserDetailsQuery } from "@mzawadie/sdk/lib/queries/user";
import React from "react";
import { useIntl } from "react-intl";

import "./scss/index.module.scss";

const AddressBook: React.FC<{
    user: User;
}> = ({ user }) => {
    const { defaultCountry, countries } = React.useContext(ShopContext);
    const [displayNewModal, setDisplayNewModal] = React.useState(false);
    const [displayEditModal, setDisplayEditModal] = React.useState(false);
    const [addressData, setAddressData] = React.useState(null);
    const [setDefaultUserAddress] = useDefaultUserAddress(undefined, {
        refetchQueries: (result) => {
            if (result.data.accountSetDefaultAddress.errors.length > 0) {
                if (
                    result.data.accountSetDefaultAddress.errors.find(
                        (err) => err.code === AccountErrorCode.NOT_FOUND
                    )
                ) {
                    return [
                        {
                            query: getUserDetailsQuery,
                        },
                    ];
                }
            }
        },
    });
    const [setDeleteUserAddress] = useDeleteUserAddresss(undefined, {
        refetchQueries: (result) => {
            if (result.data.accountAddressDelete.errors.length > 0) {
                if (
                    result.data.accountAddressDelete.errors.find(
                        (err) => err.code === AccountErrorCode.NOT_FOUND
                    )
                ) {
                    return [
                        {
                            query: getUserDetailsQuery,
                        },
                    ];
                }
            }
        },
    });
    const intl = useIntl();

    const userAddresses = user.addresses?.map((address) => {
        const addressToDisplay: any = { address: { ...address } };

        addressToDisplay.onEdit = () => {
            setDisplayEditModal(true);
            setAddressData({
                address,
                id: address?.id,
            });
        };

        addressToDisplay.onRemove = () =>
            setDeleteUserAddress({
                addressId: address?.id,
            });

        addressToDisplay.setDefault = (type: string) => {
            setDefaultUserAddress({
                id: address?.id,
                type: type === "BILLING" ? AddressTypeEnum.BILLING : AddressTypeEnum.SHIPPING,
            });
        };
        return addressToDisplay;
    });

    return (
        <div className="address-book-container">
            <AddressGrid
                addresses={userAddresses}
                addNewAddress={() => {
                    setDisplayNewModal(true);
                }}
            />

            {displayNewModal && (
                <AddressFormModal
                    hideModal={() => {
                        setDisplayNewModal(false);
                    }}
                    userId={user.id}
                    {...{ defaultValue: defaultCountry || {} }}
                    submitBtnText={intl.formatMessage(commonMessages.add)}
                    title={intl.formatMessage(checkoutMessages.addNewAddress)}
                    {...{ countriesOptions: countries }}
                    formId="address-form"
                />
            )}

            {displayEditModal && (
                <AddressFormModal
                    hideModal={() => {
                        setDisplayEditModal(false);
                    }}
                    address={addressData}
                    submitBtnText={intl.formatMessage(commonMessages.save)}
                    title={intl.formatMessage({ defaultMessage: "Edit address" })}
                    {...{ countriesOptions: countries }}
                    formId="address-form"
                />
            )}
        </div>
    );
};

export default AddressBook;

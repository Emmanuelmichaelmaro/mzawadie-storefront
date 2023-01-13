import { AddNewTile, TileGrid } from "@mzawadie/ui-kit/atoms";
import { AddressTile } from "@mzawadie/ui-kit/molecules";
import React from "react";

import { IProps } from "./types";

/**
 * Addresses tiles with add new address tile opening address form addition modal.
 */
export const AddressGrid: React.FC<IProps> = ({ addresses, addNewAddress }: IProps) => {
    const addNewTile = <AddNewTile key="newTile" type="address" onClick={addNewAddress} />;

    const addressTiles = addresses.reduce(
        (elements, address) => {
            elements.push(<AddressTile key={`addressTile-${address.id}`} {...address} />);
            return elements;
        },
        [addNewTile]
    );

    return <TileGrid columns={2} elements={addressTiles} />;
};

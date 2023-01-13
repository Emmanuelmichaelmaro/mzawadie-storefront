import { NavLink, ShadowBox } from "@mzawadie/ui-kit/atoms";
import { useHandlerWhenClickedOutside } from "@mzawadie/ui-kit/hooks";
import React from "react";

import * as S from "./styles";

const Column: React.FC<any> = ({ item }) => (
    <S.RowItem>
        <S.SubLink item={item} />
        {item.children.length > 0 &&
            // eslint-disable-next-line react/jsx-key
            item.children.map((subitem: any) => <S.SubLink item={subitem} light />)}
    </S.RowItem>
);

export const Dropdown: React.FC<any> = ({ onHide, item }) => {
    const { setElementRef } = useHandlerWhenClickedOutside(onHide);

    return (
        <S.Wrapper ref={setElementRef} onMouseLeave={onHide} onClick={onHide}>
            <S.Rows>
                {item.children.map((item: any) => (
                    // eslint-disable-next-line react/jsx-key
                    <Column item={item} />
                ))}
            </S.Rows>

            <S.Side>
                <S.RowItem>
                    <NavLink item={{ ...item, name: "view all products" }} />
                </S.RowItem>
            </S.Side>

            <ShadowBox />
        </S.Wrapper>
    );
};

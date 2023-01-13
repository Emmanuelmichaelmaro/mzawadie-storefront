import React from "react";

import * as S from "./styles";
import { ITileGridProps } from "./types";

export const TileGrid: React.FC<ITileGridProps> = ({ elements, columns = 3 }: ITileGridProps) => {
    return (
        <S.Wrapper>
            {elements.map((element: React.ReactNode, index) => (
                <S.Tile key={index} columns={columns}>
                    {element}
                </S.Tile>
            ))}
        </S.Wrapper>
    );
};

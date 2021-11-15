import { PlaceholderImage } from "@mzawadie/prototype/atoms";
import { maybe } from "@next/utils/misc";
import React from "react";

import { CachedImage } from "../index";
import { IProps } from "./types";

export const Thumbnail: React.FC<IProps> = ({ source, children, ...props }: IProps) => {
    const { thumbnail, thumbnail2x } = source;

    if (!thumbnail && !thumbnail2x) {
        return <PlaceholderImage />;
    }

    return (
        <CachedImage
            {...props}
            url={maybe(() => thumbnail!.url)}
            url2x={maybe(() => thumbnail2x!.url)}
            alt={maybe(() => (thumbnail!.alt ? thumbnail!.alt : ""), "")}
        >
            {children}
        </CachedImage>
    );
};

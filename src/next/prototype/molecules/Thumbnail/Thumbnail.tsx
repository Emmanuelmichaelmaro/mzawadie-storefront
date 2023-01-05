import { PlaceholderImage } from "@mzawadie/ui-kit/atoms";
import { maybe } from "@mzawadie/ui-kit/utils/misc";
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

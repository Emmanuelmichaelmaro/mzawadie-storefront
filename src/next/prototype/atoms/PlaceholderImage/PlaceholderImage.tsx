import NoPhoto from "images/no-photo.svg";
import Image from "next/image";
import React from "react";

import { IProps } from "./types";

export const PlaceholderImage: React.FC<IProps> = ({ alt = "placeholder" }: IProps) => {
    return <Image src={NoPhoto} alt={alt} />;
};

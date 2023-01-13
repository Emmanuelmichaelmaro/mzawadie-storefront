import React from "react";

export interface ITileProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    tileType?: "hover" | "addNew";
}

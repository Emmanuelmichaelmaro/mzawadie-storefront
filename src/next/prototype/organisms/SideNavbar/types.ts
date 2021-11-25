import { items } from "./fixtures";

export interface ISideNavbarProps {
    onHide: (show: boolean) => void;
    show: boolean;
    target?: HTMLElement | null;
    // TODO: use codegen types
    items: typeof items;
}

export interface ISideNavbarState {
    buffer: {
        index: number | null;
        depth: number | null;
    };
    index: number | null;
    depth: number | null;
}

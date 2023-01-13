import { IFilters } from "@next/types";
import { Attribute } from "src/next/gqlTypes/Attribute";

export interface IProps {
    attributes: Attribute[];
    filters: IFilters;
    hide: () => void;
    onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
    show: boolean;
    target?: HTMLElement | null;
}

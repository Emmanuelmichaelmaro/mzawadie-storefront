import { Attribute } from "@next/graphql/gqlTypes/Attribute";
import { IFilters } from "@next/types";

export interface IProps {
    attributes: Attribute[];
    filters: IFilters;
    hide: () => void;
    onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
    show: boolean;
    target?: HTMLElement | null;
}

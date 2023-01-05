import { Attribute, Attribute_choices_edges_node } from "@next/graphql/gqlTypes/Attribute";
import { NonNullableType } from "@mzawadie/ui-kit/utils/tsUtils";

export type IFilterAttribute = {
    selected?: boolean;
} & NonNullableType<Attribute_choices_edges_node>;

export type IFilterAttributes = {
    values: IFilterAttribute[];
} & NonNullableType<Attribute>;

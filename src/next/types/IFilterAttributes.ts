import { NonNullableType } from "@mzawadie/ui-kit/utils/tsUtils";

import { Attribute_choices_edges_node, Attribute } from "../gqlTypes/Attribute";

export type IFilterAttribute = {
    selected?: boolean;
} & NonNullableType<Attribute_choices_edges_node>;

export type IFilterAttributes = {
    values: IFilterAttribute[];
} & NonNullableType<Attribute>;

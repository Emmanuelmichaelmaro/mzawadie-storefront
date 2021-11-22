import { commonMessages } from "@mzawadie/core";
import { IconButton } from "@mzawadie/prototype/atoms";
import { AttributeValuesChecklist } from "@mzawadie/prototype/molecules";
import { useHandlerWhenClickedOutside } from "@next/hooks";
import { IFilterAttribute, IFilters } from "@next/types";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Overlay } from "../index";
import * as S from "./styles";
import { IProps } from "./types";

const checkIfAttributeIsChecked = (filters: IFilters, value: IFilterAttribute, slug: string) => {
    if (filters!.attributes && filters.attributes.hasOwnProperty(slug)) {
        return !!filters.attributes[slug].find((filter) => filter === value.slug);
    }
    return false;
};

export const FilterSidebar: React.FC<IProps> = ({
    hide,
    filters,
    show,
    attributes,
    target,
    onAttributeFiltersChange,
}: IProps) => {
    const { setElementRef } = useHandlerWhenClickedOutside(() => {
        hide();
    });

    return (
        <Overlay duration={0} position="left" show={show} hide={hide} transparent target={target}>
            <S.Wrapper ref={setElementRef()} data-test="filterSidebar">
                <S.Header>
                    <span>
                        <FormattedMessage {...commonMessages.filterHeader} />
                    </span>
                    <IconButton
                        testingContext="hideFilters"
                        onClick={hide}
                        name="x"
                        size={18}
                        color="000"
                    />
                </S.Header>
                {attributes.map(({ id, slug, name, choices }) => {
                    const values = (choices?.edges.map(({ node }: any) => node) ||
                        []) as IFilterAttribute[];

                    return (
                        <AttributeValuesChecklist
                            key={id}
                            title={name}
                            name={slug!}
                            values={values.map((value) => ({
                                ...value,
                                selected: checkIfAttributeIsChecked(filters, value, slug!),
                            }))}
                            valuesShowLimit
                            onValueClick={(value) => onAttributeFiltersChange(slug!, value.slug)}
                        />
                    );
                })}
            </S.Wrapper>
        </Overlay>
    );
};

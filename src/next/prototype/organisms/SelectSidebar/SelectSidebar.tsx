import { ButtonLink } from "@mzawadie/ui-kit/atoms";
import { useHandlerWhenClickedOutside } from "@mzawadie/ui-kit/hooks";
import { CardHeader, OverlayItem } from "@mzawadie/ui-kit/molecules";
import React from "react";

import { Overlay } from "../index";
import * as S from "./styles";
import { IProps } from "./types";

export const SelectSidebar: React.FC<IProps> = ({
    title,
    options = [],
    disabledOptions = [],
    selectedOptions = [],
    hide,
    onSelect,
    show,
    target,
    footerTitle,
    onClickFooter,
    testingContextId,
}: IProps) => {
    const { setElementRef } = useHandlerWhenClickedOutside(() => {
        hide();
    });

    return (
        <Overlay
            position="right"
            duration={0}
            show={show}
            hide={hide}
            transparent
            target={target}
            testingContext="attributeSelection"
            testingContextId={testingContextId}
        >
            <S.Wrapper ref={setElementRef()}>
                <CardHeader divider onHide={hide}>
                    <span>{title}</span>
                </CardHeader>
                <S.Content>
                    {options.map((option) => {
                        const isSelected = selectedOptions.some((value) => value === option.value);
                        const isDisabled = disabledOptions.some((value) => value === option.value);

                        return (
                            <S.Option key={option.value} disabled={isDisabled}>
                                <OverlayItem
                                    testingContextId={option.value}
                                    selected={isSelected}
                                    disabled={isDisabled}
                                    onClick={() => onSelect(option.value)}
                                >
                                    {option.label}
                                </OverlayItem>
                            </S.Option>
                        );
                    })}
                </S.Content>
                {footerTitle && (
                    <S.Footer onClick={onClickFooter}>
                        <ButtonLink testingContext="footerActionButton" color="secondary">
                            {footerTitle}
                        </ButtonLink>
                    </S.Footer>
                )}
            </S.Wrapper>
        </Overlay>
    );
};

import { styled } from "@next/styles";

export const Wrapper = styled.span`
    color: ${(props) => props.theme.colors.lightFont};
    display: inline-block;
    white-space: pre;
`;

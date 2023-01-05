import { styled } from "@mzawadie/ui-kit/styles";
import { spacer } from "@mzawadie/ui-kit/styles/constants";

export const Wrapper = styled.div`
    padding: ${(props) => `${props.theme.spacing.spacer} ${spacer / 2}rem`};
`;

export const Link = styled.a`
    path {
        transition: 0.3s;
    }

    &:hover {
        path {
            fill: ${(props) => props.theme.colors.primary};
        }
    }
`;

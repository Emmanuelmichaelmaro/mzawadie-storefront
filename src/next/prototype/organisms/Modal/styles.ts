import { styled } from "@mzawadie/ui-kit/styles";

export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
`;

export const Content = styled.div`
    padding: ${({ theme: { spacing } }) => `4rem ${spacing.gutter} 1.8rem ${spacing.gutter}`};
`;

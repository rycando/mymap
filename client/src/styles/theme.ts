import styled, { DefaultTheme, css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperWithHeaderFooter = css`
  width: 100%;
  padding-top: 7rem;
  padding-bottom: 8.8rem;
  box-sizing: border-box;
`;
export const WrapperWithHeader = css`
  width: 100%;
  padding-top: 7rem;
  box-sizing: border-box;
`;

export const WrapperWithFooter = css`
  width: 100%;
  padding-bottom: 8.8rem;
  box-sizing: border-box;
`;

const calculateMargin = (
  gap: string,
  direction: "row" | "column" | "column-reverse"
) => {
  if (direction === "row") return `margin-left: ${gap}`;
  if (direction === "column") return `margin-top: ${gap}`;
  if (direction === "column-reverse") return `margin-bottom: ${gap}`;
  return "";
};
export const gap = (
  gapLength: string,
  direction: "row" | "column" | "column-reverse" = "row"
) => {
  return css`
    & > * + * {
      ${calculateMargin(gapLength, direction)}
    }
  `;
};

export const theme: DefaultTheme = {
  color: {
    black: "#333333",
    gray7: "#585858",
    gray6: "#767676",
    gray5: "#9C9C9C",
    gray4: "#B4B4B4",
    gray3_5: "#C4C4C4",
    gray3: "#CECECE",
    gray2: "#E5E5E5",
    gray1: "#F8F9FA",
    white: "#FFFFFF",
    orange: "#FF7964",
    red: "#FC453A",
  },
};

export const input = css`
  width: 100%;
  padding: 1.5rem 1.6rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  line-height: 160%;
  box-sizing: border-box;
  color: ${theme.color.gray7};
  border: 0.1rem solid ${theme.color.gray3};
  ::placeholder {
    color: ${theme.color.gray4};
  }
  &:focus {
    border: 0.1rem solid ${theme.color.gray3};
  }
`;

export const Button = styled.div`
  ${flexCenter};
  color: #fff;
  padding: 1.5rem 0;
  font-size: 1.6rem;
  border-radius: 1rem;
  line-height: 135%;
  box-sizing: border-box;
  background-color: ${theme.color.orange};
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 2.1rem;
  line-height: 140%;
  white-space: pre-wrap;
  margin-top: 2.6rem;
  letter-spacing: -2%;
`;

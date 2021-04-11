import { createGlobalStyle } from "styled-components";
import "./fonts.css";

const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.font.light};
    background: ${({ theme }) => theme.color.background};
    font-size: 20px;
  }
  h1, h2, h3, h4 {
    font-weight: 500;
  }
`;

export default GlobalStyle;

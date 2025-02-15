import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // 14px
    }

    @media (max-width: 480px) {
      font-size: 81.25%; // 13px
    }
  }

  body {
    background: #f5f5f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #2d3748;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Improve mobile tap targets */
  a, button {
    min-height: 44px;
    min-width: 44px;
  }

  /* Remove blue highlight on mobile */
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: transparent;
  }
`; 
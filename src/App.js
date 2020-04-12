import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import theme from './theme';
import Router from './views/Router';
import Auth from './containers/Auth/Auth';

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    background-color: ${props => props.theme.color1};
    font-family: ${props => props.theme.fontFamilySecondary};
    font-size: 14px;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Auth>
        <Router />
      </Auth>
    </ThemeProvider>
  );
};

export default App;

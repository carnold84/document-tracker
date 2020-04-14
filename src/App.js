import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import theme from './theme';
import Main from './views/Main';
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
        <Main />
      </Auth>
    </ThemeProvider>
  );
};

export default App;

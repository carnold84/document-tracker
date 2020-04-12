import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import theme from './theme';
import Documents from './views/Documents';
import AddDocument from './views/AddDocument/AddDocument';
import Auth from './containers/Auth/Auth';

const Wrapper = styled.div`
  background-color: ${props => props.theme.color1};
  position: relative;
`;

const VIEWS = {
  ADD_DOCUMENT: 'add_document',
  DOCUMENTS: 'documents'
};

const App = () => {
  const [view, setView] = useState(VIEWS.DOCUMENTS);

  const onAddDocument = () => {
    setView(VIEWS.ADD_DOCUMENT);
  };

  const onCloseAddDocument = () => {
    setView(VIEWS.DOCUMENTS);
  };

  return (
    <ThemeProvider theme={theme}>
      <Auth>
        <Wrapper>
          {view === VIEWS.DOCUMENTS && (
            <Documents onAddDocument={onAddDocument} />
          )}
          {view === VIEWS.ADD_DOCUMENT && (
            <AddDocument onClose={onCloseAddDocument} />
          )}
        </Wrapper>
      </Auth>
    </ThemeProvider>
  );
};

export default App;

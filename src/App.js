import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import theme from './theme';
import Documents from './views/Documents';
import AddDocument from './views/AddDocument/AddDocument';
import View from './components/View/View';
import Auth from './containers/Auth/Auth';

const Wrapper = styled.div`
  background-color: ${props => props.theme.color1};
  position: relative;
`;

const ControlButton = styled.button`
  align-items: center;
  background-color: ${props => props.theme.color1};
  border: 1px solid ${props => props.theme.colorAlt1};
  border-radius: 30px;
  bottom: -30px;
  display: flex;
  fill: ${props => props.theme.colorAlt1};
  height: 60px;
  justify-content: center;
  position: absolute;
  right: 20px;
  width: 60px;
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
            <View
              controls={
                <ControlButton onClick={onAddDocument}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
                </ControlButton>
              }
              maxHeight={250}
              minHeight={60}
              title={'Document'}
            >
              <Documents />
            </View>
          )}
          {view === VIEWS.ADD_DOCUMENT && (
            <View
              controls={<button onClick={onCloseAddDocument}>Close</button>}
              title={'Add Document'}
            >
              <AddDocument />
            </View>
          )}
        </Wrapper>
      </Auth>
    </ThemeProvider>
  );
};

export default App;

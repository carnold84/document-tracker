import React, { useState } from 'react';
import './App.css';

import Documents from './views/Documents';
import AddDocument from './views/AddDocument';
import View from './components/View/View';
import Auth from './components/Auth/Auth';

const VIEWS = {
  ADD_DOCUMENT: 'add_document',
  DOCUMENTS: 'documents'
};

function App() {
  const [view, setView] = useState(VIEWS.DOCUMENTS);

  const onAddDocument = () => {
    setView(VIEWS.ADD_DOCUMENT);
  };

  const onCloseAddDocument = () => {
    setView(VIEWS.DOCUMENTS);
  };

  return (
    <Auth>
      {token => {
        console.log(token)
        return (
          <div className="app-wrapper">
            {view === VIEWS.DOCUMENTS && (
              <View
                controls={<button onClick={onAddDocument}>Add Document</button>}
                title={'Documents'}
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
          </div>
        );
      }}
    </Auth>
  );
}

export default App;

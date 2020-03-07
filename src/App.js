import React, { useState } from 'react';
import './App.css';

import Documents from './views/Documents';
import AddDocument from './views/AddDocument';
import View from './components/View/View';

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
    <div className="app-wrapper">
      {view === VIEWS.DOCUMENTS && (
        <View>
          <Documents />
          <button onClick={onAddDocument}>Add Document</button>
        </View>
      )}
      {view === VIEWS.ADD_DOCUMENT && (
        <View>
          <button onClick={onCloseAddDocument}>Close</button>
          <AddDocument />
        </View>
      )}
    </div>
  );
}

export default App;

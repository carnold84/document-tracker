import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import DocumentsService from '../services/Documents';
import Document from './Document';
import Documents from './Documents';
import AddDocument from './AddDocument';

const Wrapper = styled.div`
  position: relative;
`;

const VIEWS = {
  ADD_DOCUMENT: 'add_document',
  DOCUMENTS: 'documents',
  DOCUMENT: 'document'
};

const Router = () => {
  const [documents, setDocuments] = useState();
  const [view, setView] = useState(VIEWS.DOCUMENTS);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);

  const onDocumentsInit = files => {
    console.log(files)
    setDocuments(files);
  };

  useEffect(() => {
    DocumentsService.init(onDocumentsInit);
  }, []);

  const onAddComplete = async () => {
    setDocuments(undefined);
    setView(VIEWS.DOCUMENTS);
    const result = await DocumentsService.loadFileList();
    setDocuments(result);
  };

  const onAddDocument = () => {
    setCurrentDocumentId(null);
    setView(VIEWS.ADD_DOCUMENT);
  };

  const onCloseAddDocument = () => {
    setCurrentDocumentId(null);
    setView(VIEWS.DOCUMENTS);
  };

  const onViewDocument = id => {
    console.log(id)
    setCurrentDocumentId(id);
    setView(VIEWS.DOCUMENT);
  };

  let document;
  if (documents) {
    document = documents.filter(element => {
      return element.id === currentDocumentId;
    })[0];
  }

  return (
    <Wrapper>
      {view === VIEWS.DOCUMENTS && (
        <Documents
          documents={documents}
          onAddDocument={onAddDocument}
          onViewDocument={onViewDocument}
        />
      )}
      {view === VIEWS.ADD_DOCUMENT && (
        <AddDocument onAddComplete={onAddComplete} onClose={onCloseAddDocument} />
      )}
      {view === VIEWS.DOCUMENT && (
        <Document document={document} />
      )}
    </Wrapper>
  );
};

export default Router;

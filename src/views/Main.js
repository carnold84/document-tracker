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
  DOCUMENT: 'document',
};

let dummyData = [];
for (let i = 0; i < 15; i++) {
  dummyData.push({
    id: `id-${i}`,
    name: 'My new receipt',
    description: 'My description',
    properties: {type: 'statement'},
    webViewLink: 'https://drive.google.com/file/d/1-rTZN7FSF06HDQcBgk1g6loXp4PE_KHF/view?usp=drivesdk',
    thumbnailLink: 'https://lh3.googleusercontent.com/o83S2yUrrCBVat61J0TmgXKD_EsiOjP49omI-hd1LCccyExRfMLRy_ml0L5PnhhJWwHpteoAiGY=s220',
    createdTime: '2020-04-12T22:20:52.890Z',
    modifiedTime: '2020-04-12T22:20:52.890Z',
    fullFileExtension: '',
  });
}

const Main = () => {
  const [documents, setDocuments] = useState();
  const [view, setView] = useState(VIEWS.DOCUMENTS);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);

  const onDocumentsInit = files => {
    setDocuments(files);
  };

  useEffect(() => {
    //DocumentsService.init(onDocumentsInit);
    setDocuments(dummyData);
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

  const onCloseView = () => {
    setCurrentDocumentId(null);
    setView(VIEWS.DOCUMENTS);
  };

  const onViewDocument = id => {
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
        <AddDocument onAddComplete={onAddComplete} onClose={onCloseView} />
      )}
      {view === VIEWS.DOCUMENT && (
        <Document document={document} onClose={onCloseView} />
      )}
    </Wrapper>
  );
};

export default Main;

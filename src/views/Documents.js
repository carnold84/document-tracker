import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import documentsService from '../services/Documents';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading/Loading';

import {formatDate} from '../utils/date';
import View from '../components/View/View';
import ActionButton from '../components/ActionButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
`;

const Empty = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color2};
  border-radius: 5px;
  color: ${props => props.theme.colorAlt1};
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const dummyData = [];
const types = ['Receipt', 'Application', 'Statement'];

for (let i = 0; i < 15; i++) {
  dummyData.push(
    {
      created: 1586571831498,
      description: `Description for document number ${i + 1}`,
      id: `id${i}`,
      modified: 1586571831498,
      title: `Document ${i + 1}`,
      type: types[Math.round(Math.random() * 2)]
    }
  );
}

console.log(dummyData)

const Documents = ({onAddDocument}) => {
  const [documents, setDocuments] = useState();

  const onDocumentsInit = result => {
    setDocuments(result.documents);
  };

  useEffect(() => {
    //documentsService.init(onDocumentsInit);
    setDocuments(dummyData);
  }, []);

  console.log(documents)
  let content;
  
  if (documents === undefined) {
    content = <Loading />;
  } else if (documents === null) {
    content = <Empty>Documents Unavailable</Empty>;
  } else if (documents.length === 0) {
    content = <Empty>No Documents</Empty>;
  } else {
    content = (
      <List>
        {documents.map(document => {
          return (
            <ListItem
              key={document.id}
              subTitle={formatDate(document.created)}
              title={document.title}
              type={document.type}
            />
          );
        })}
      </List>
    );
  }

  return (
    <View
      controls={
        <ActionButton onClick={onAddDocument}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </ActionButton>
      }
      maxHeight={250}
      minHeight={60}
      title={'Document'}
    >
      <Wrapper>
        {content}
      </Wrapper>
    </View>
  )
}

export default Documents;

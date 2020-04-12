import React from 'react';
import styled from 'styled-components';

import ListItem from '../components/ListItem';
import Loading from '../components/Loading/Loading';

import {formatISODate} from '../utils/date';
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

const Documents = ({documents, onAddDocument, onViewDocument}) => {

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
              onClick={() => onViewDocument(document.id)}
              subTitle={formatISODate(document.createdTime)}
              title={document.name}
              type={document.properties.type}
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

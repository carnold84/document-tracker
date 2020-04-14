import React, { useState } from 'react';
import _orderBy from 'lodash/orderBy';
import styled from 'styled-components';

import {formatISODate} from '../utils/date';

import ActionButton from '../components/ActionButton';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import View, {HEADER_TYPES} from '../components/View';

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 0;
  position: relative;
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
  const [sortBy, setSortBy] = useState('createdTime');

  let content;
  
  if (documents === undefined) {
    content = <Loading />;
  } else if (documents === null) {
    content = <Empty>Documents Unavailable</Empty>;
  } else if (documents.length === 0) {
    content = <Empty>No Documents</Empty>;
  } else {
    const sortedDocuments = _orderBy(documents, [sortBy], ['desc']);
    console.log(sortedDocuments);

    content = (
      <List>
        {sortedDocuments.map(document => {
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
      defaultHeaderType={HEADER_TYPES.EXPANDED}
      title={'Document'}
    >
      <Wrapper>
        {content}
      </Wrapper>
    </View>
  );
};

export default Documents;

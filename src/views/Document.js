import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import View from '../components/View/View';

const Preview = styled.div`
  background-color: ${props => props.theme.color2};
  border-radius: 5px;
  height: 240px;
  margin: 0 0 20px;
`;

const PreviewImg = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`;

const AddDocument = ({document}) => {
  return (
      <View
        title={document.title}
      >
        {document.title}
      </View>
  );
};

export default AddDocument;

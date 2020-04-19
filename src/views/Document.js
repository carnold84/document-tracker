import React from 'react';
import styled from 'styled-components';

import BackButton from '../components/BackButton';
import View from '../components/View';
import Label from '../components/Label';
import TextField from '../components/TextField';
import Textarea from '../components/Textarea';
import Tag from '../components/Tag';
import Preview from '../components/Preview';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 0 20px;
`;

const Document = ({document, onClose}) => {
  const {description, name, properties, thumbnailLink, webViewLink} = document;

  return (
    <View
      controlsLeft={
        <BackButton onClick={onClose} />
      }
    >
      <FormContainer>
        <Label htmlFor="title">Name</Label>
        <TextField disabled={true} id={'title'} type={'text'} value={name} />
        <Label>Type</Label>
        <TagContainer>
          <Tag>{properties.type}</Tag>
        </TagContainer>
        <Label as="div">Preview</Label>
        <Preview link={webViewLink} src={thumbnailLink} />
        <Label htmlFor="description">Description</Label>
        <Textarea
          disabled={true}
          id={'description'}
          style={{height: '88px'}}
          value={description}
        />
      </FormContainer>
    </View>
  );
};

export default Document;

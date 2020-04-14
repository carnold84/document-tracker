import React from 'react';
import styled from 'styled-components';

import BackButton from '../components/BackButton';
import View from '../components/View';
import Label from '../components/Label';
import TextField from '../components/TextField';
import Textarea from '../components/Textarea';
import Tag from '../components/Tag';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 0 20px;
`;

const Document = ({document, onClose}) => {
  const {description, name, properties, thumbnailLink, webViewLink} = document;

  return (
    <View
      controls={
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
        <Preview>
          <a href={webViewLink} rel={'noopener noreferrer'} target={'_blank'}>
            <PreviewImg alt={'Preview'} className={'preview-image'} src={thumbnailLink} />
          </a>
        </Preview>
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

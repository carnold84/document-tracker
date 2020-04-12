import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import documentsService from '../../services/Documents';
import View from '../../components/View/View';
import ActionButton from '../../components/ActionButton';

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

const Label = styled.label`
  color: ${props => props.theme.text2};
  font-family: ${props => props.theme.fontFamilyPrimary};
  font-style: italic;
  margin: 0 0 5px;
`;

const TextField = styled.input`
  background-color: ${props => props.theme.color1};
  border: 2px solid ${props => props.theme.color3};
  border-radius: 22px;
  color: ${props => props.theme.text1};
  font-family: ${props => props.theme.fontFamilySecondary};
  font-size: 1em;
  margin: 0 0 20px;
  padding: 7px 15px;

  &:focus {
    box-shadow: 0 0 0 2px ${props => props.theme.color4};
    outline: none;
  }
`;

const Textarea = styled(TextField).attrs({
  as: 'textarea'
})`
  border-radius: 5px;
`;

const BackButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${props => props.theme.textAlt1};
  display: flex;
  fill: ${props => props.theme.textAlt1};
  font-family: ${props => props.theme.fontFamilySecondary};
  font-size: 1em;
  left: 20px;
  padding: 7px 0;
  position: absolute;
  top: 20px;
`;

const STEPS = {
  CAPTURE: 'capture',
  DETAILS: 'details',
};

const readURL = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = evt => {
      resolve(evt.target.result);
    };

    reader.readAsDataURL(file);
  });
};

const AddDocument = ({onClose}) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [step, setStep] = useState(STEPS.CAPTURE);
  const [title, setTitle] = useState('');

  let elInput;

  const getInputRef = el => {
    elInput = el;
  };

  useEffect(() => {
    if (step === STEPS.CAPTURE) {
      elInput.click();
    }
  });

  const onDescriptionChange = evt => {
    setDescription(evt.currentTarget.value);
  };

  const onFileSelect = async () => {
    const file = elInput.files[0];
    if (file) {
      setFile(file);
      setStep(STEPS.DETAILS);

      const image = await readURL(file);
      setImageUrl(image);
    }
  };

  const onFileNameChange = evt => {
    setFileName(evt.currentTarget.value);
  };

  const onTitleChange = evt => {
    setTitle(evt.currentTarget.value);
  };

  const onSubmit = async evt => {
    evt.preventDefault();

    const data = { description, title };
    const result = await documentsService.saveDocument(data, file);
  };

  return (
    <form onSubmit={onSubmit}>
      <View
        controls={
          <div>
            <BackButton onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
                <path fill="none" d="M0 0h24v24H0z"/>
              </svg>
              <span>Back</span>
            </BackButton>
            <ActionButton type={'submit'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </ActionButton>
          </div>
        }
        title={'Add Document'}
      >
        <main className="capture-image">
          {step === STEPS.CAPTURE && (
            <input
              accept="image/*"
              capture="environment"
              onChange={onFileSelect}
              ref={getInputRef}
              type="file"
            />
          )}
          {step === STEPS.DETAILS && (
            <FormContainer onSubmit={onSubmit}>
              <Label htmlFor="title">Name</Label>
              <TextField id={'title'} onChange={onTitleChange} type={'text'} value={title} />
              <Label htmlFor="fileName">File Name</Label>
              <TextField id={'fileName'} onChange={onFileNameChange} type={'text'} value={fileName} />
              <Label as="div">Preview</Label>
              <Preview>
                <PreviewImg alt={'Preview'} className={'preview-image'} src={imageUrl} />
              </Preview>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id={'description'}
                onChange={onDescriptionChange}
                style={{height: '88px'}}
                value={description}
              />
            </FormContainer>
          )}
        </main>
      </View>
    </form>
  );
};

export default AddDocument;

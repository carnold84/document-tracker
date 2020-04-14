import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import DocumentsService from '../services/Documents';
import ActionButton from '../components/ActionButton';
import BackButton from '../components/BackButton';
import Label from '../components/Label';
import RadioGroup from '../components/RadioGroup';
import Textarea from '../components/Textarea';
import TextField from '../components/TextField';
import View, { HEADER_TYPES } from '../components/View';
import { format } from 'date-fns';
import Loading from '../components/Loading';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: ${props => props.theme.text1};
  font-family: ${props => props.theme.fontFamilyPrimary};
  font-style: italic;
  font-weight: 400;
  margin: 0 0 20px;
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

const FileInputWrapper = styled.div`
  position: relative;
`;

const FileInputButton = styled(TextField).attrs({
  as: 'div',
})`
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 12px 15px;
  pointer-events: none;
  width: 100%;
`;

const FileInput = styled.input.attrs({
  accept: 'image/*',
  capture: 'environment',
  type: 'file',
})`
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
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

const AddDocument = ({onAddComplete, onClose}) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [step, setStep] = useState(STEPS.CAPTURE);
  const [type, setType] = useState('Receipt');
  const defTitle = `${type}-${format(new Date(), 'd-MMMM-yyyy-HH-mm')}`;
  const [defaultTitle, setDefaultTitle] = useState(defTitle);
  const [title, setTitle] = useState(defaultTitle);

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

  const onTitleChange = evt => {
    setTitle(evt.currentTarget.value);
  };

  const onTypeChange = value => {
    setType(value);

    if (title === defaultTitle) {
      const newTitle = `${value}-${format(new Date(), 'd-MMMM-yyyy-HH-mm')}`;
      
      setTitle(newTitle);
      setDefaultTitle(newTitle);
    }
  };

  const onSubmit = async evt => {
    console.log(onSubmit);
    evt.preventDefault();

    setIsSaving(true);

    const data = { description, title, type };
    await DocumentsService.saveDocument(data, file);
    
    setIsSaving(false);

    onAddComplete();
  };

  return (
    <form onSubmit={onSubmit}>
      <View
        controls={
          <div>
            <BackButton onClick={onClose} />
            <ActionButton type={'submit'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </ActionButton>
          </div>
        }
        defaultHeaderType={HEADER_TYPES.COMPACT}
      >
        {isSaving && <Loading />}
        <Title>Add Document</Title>
        {!isSaving && step === STEPS.CAPTURE && (
          <FileInputWrapper>
            <FileInputButton>Select A File</FileInputButton>
            <FileInput
              onChange={onFileSelect}
              ref={getInputRef}
            />
          </FileInputWrapper>
        )}
        {!isSaving && step === STEPS.DETAILS && (
          <FormContainer>
            <Label htmlFor="title">Name</Label>
            <TextField id={'title'} onChange={onTitleChange} type={'text'} value={title} />
            <Label>Type</Label>
            <RadioGroup
              name={'type'}
              onChange={onTypeChange}
              options={[
                {
                  label: 'Receipt',
                  value: 'Receipt',
                },
                {
                  label: 'Application',
                  value: 'Application',
                },
                {
                  label: 'Statement',
                  value: 'Statement',
                },
              ]}
              style={{margin: '0 0 20px'}}
              value={type}
            />
            <Label as="div">Preview</Label>
            <Preview>
              {imageUrl && (
                <PreviewImg alt={'Preview'} className={'preview-image'} src={imageUrl} />
              )}
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
      </View>
    </form>
  );
};

export default AddDocument;

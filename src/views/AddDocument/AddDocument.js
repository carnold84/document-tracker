import React, { useState, useEffect } from 'react';
import './AddDocument.css';

import documentsService from '../../services/Documents';

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

const AddDocument = () => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
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

  const onTitleChange = evt => {
    setTitle(evt.currentTarget.value);
  };

  const onSubmit = async evt => {
    evt.preventDefault();

    const data = { description, title };
    const result = await documentsService.saveDocument(data, file);
  };

  return (
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
        <form className={'add-document-form'} onSubmit={onSubmit}>
          <img alt={'Preview'} className={'preview-image'} src={imageUrl} />
          <input onChange={onTitleChange} type={'text'} value={title} />
          <textarea onChange={onDescriptionChange} value={description} />
          <button>Save</button>
        </form>
      )}
    </main>
  );
};

export default AddDocument;

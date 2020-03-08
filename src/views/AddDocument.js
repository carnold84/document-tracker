import React, { useState, useEffect } from 'react';

import documentsService from '../services/Documents';

const STEPS = {
  CAPTURE: 'capture',
  DETAILS: 'details',
};

function AddDocument() {
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(STEPS.CAPTURE);
  const [title, setTitle] = useState('');

  console.log(step)
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

  const onFileSelect = () => {
    const files = elInput.files;
    if (files) {
      setStep(STEPS.DETAILS);
    }
    console.log(files);
  };

  const onTitleChange = evt => {
    setTitle(evt.currentTarget.value);
  };

  const onSubmit = async evt => {
    evt.preventDefault();

    console.log(description, title)
    const result = await documentsService.saveDocument({ description, title });
    console.log(result)
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
        <form onSubmit={onSubmit}>
          <input onChange={onTitleChange} type={'text'} value={title} />
          <textarea onChange={onDescriptionChange} value={description} />
          <button>Save</button>
        </form>
      )}
    </main>
  );
}

export default AddDocument;

import React from 'react';

function AddDocument() {
  return (
    <main>
      <p>Add Document</p>
      <div className="capture-image">
        <input type="file" accept="image/*" capture="environment" />
      </div>
    </main>
  );
}

export default AddDocument;

import React, { useEffect, useState } from 'react';

import documentsService from '../services/Documents';

function Documents() {
  const [documents, setDocuments] = useState();

  const onDocumentsInit = result => {
    console.log(result)
    setDocuments(result.documents);
  };

  useEffect(() => {
    documentsService.init(onDocumentsInit);
  }, []);

  if (documents === undefined) {
    return 'Loading Documents...';
  } else if (documents === null) {
    return 'Documents Unavailable';
  } else if (documents.length === 0) {
    return 'No Documents';
  } else {
    return (
      <ul>
        {documents.map(document => {
          return (
            <li key={document.id}>{document.title}</li>
          )
        })}
      </ul>
    );
  }
}

export default Documents;

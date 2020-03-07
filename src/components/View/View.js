import React from 'react';
import './View.css';

function View({children}) {
  return (
    <div className="view-wrapper">
      {children}
    </div>
  );
}

export default View;

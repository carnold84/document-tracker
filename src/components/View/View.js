import React from 'react';
import './View.css';

const View = ({ children, controls, title }) => {
  return (
    <div className={'view-wrapper'}>
      <header className={'view-header'}>
        <h2 className={'title'}>{title}</h2>
        {controls}
      </header>
      <div className={'view-content'}>
        {children}
      </div>
    </div>
  );
};

export default View;

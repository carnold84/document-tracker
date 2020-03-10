import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className={'wrapper'}>
      <div className={'container'}>
        <div className={'loader'}>
          <svg className={'circle'} viewBox="25 25 50 50">
            <circle className={'path'} cx="50" cy="50" r="15" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loading;

import React, { useState, useEffect } from 'react';

import authService from '../../services/Auth';
import documentsService from '../../services/Documents';

const getParams = () => {
  let result = [];
  let tmp = [];

  window.location.search
    .substr(1)
    .split("&")
    .forEach(item => {
      tmp = item.split("=");
      result.push(tmp[0]);
    });

  return result;
};

const Auth = ({ children, controls, title }) => {
  const [isAuthed, setIsAuthed] = useState(false);

  const onAuth = result => {
    console.log(result)
    setIsAuthed(true);
  };

  useEffect(() => {
    authService.init(onAuth);
  });

  if (isAuthed) {
    return children();
  } else {
    return 'Loading...';
  }
};

export default Auth;

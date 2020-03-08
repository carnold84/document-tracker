import React, { useState, useEffect } from 'react';

import authService from '../../services/Auth';

const Auth = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);

  const onAuth = result => {
    setIsAuthed(true);
  };

  useEffect(() => {
    authService.init(onAuth);
  });

  if (isAuthed) {
    return children();
  } else {
    return <p>Loading...</p>;
  }
};

export default Auth;

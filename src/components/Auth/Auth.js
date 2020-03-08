import React, { useState, useEffect } from 'react';

import authService from '../../services/Auth';

const Auth = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);

  const auth = async () => {
    await authService.init();
    setIsAuthed(true);
  };

  useEffect(() => {
    auth();
  });

  if (isAuthed) {
    return children;
  } else {
    return <p>Loading...</p>;
  }
};

export default Auth;

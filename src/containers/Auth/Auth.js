import React, { useState, useEffect } from 'react';

import authService from '../../services/Auth';
import Loading from '../../components/Loading';

const Auth = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(true);

  /* const auth = async () => {
    await authService.init();
    setIsAuthed(true);
  };

  useEffect(() => {
    auth();
  }); */

  if (isAuthed) {
    return children;
  } else {
    return <Loading />;
  }
};

export default Auth;

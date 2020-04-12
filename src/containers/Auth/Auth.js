import React, { useState, useEffect } from 'react';

import AuthService from '../../services/Auth';
import Loading from '../../components/Loading/Loading';

const Auth = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);

  const auth = async () => {
    await AuthService.init();
    setIsAuthed(true);
  };

  useEffect(() => {
    auth();
  });

  console.log(isAuthed)

  if (isAuthed) {
    return children;
  } else {
    return <Loading />;
  }
};

export default Auth;

import React, { useEffect } from 'react';
import { login } from '../services/authService';

const AutoLogin = () => {
  useEffect(() => {
    const attemptLogin = async () => {
      await login('member8@gmail.com', '123456789');
    };
    attemptLogin();
  }, []);
  return null;
};

export default AutoLogin;
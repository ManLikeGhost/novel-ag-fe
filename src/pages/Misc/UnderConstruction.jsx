import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UnderConstruction = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('novel_auth_token');

    if (!tokenFromStorage) {
      return navigate('/Sign-in');
    }
  }, [navigate]);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default UnderConstruction;

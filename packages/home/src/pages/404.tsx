import { navigate } from 'gatsby';
import React, { useEffect } from 'react';

const NotFoundPage = () => {
  useEffect(() => {
    navigate('/');
  }, []);

  return <div />;
};

export default NotFoundPage;

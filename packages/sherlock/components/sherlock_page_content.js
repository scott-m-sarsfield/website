import React from 'react';
import { Helmet } from 'react-helmet';
import SherlockGame from './sherlock_game';

const SherlockPageContent = () => (
  <div className="sherlock-page-content">
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu&family=Ubuntu+Mono&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <SherlockGame />
  </div>
);

export default SherlockPageContent;

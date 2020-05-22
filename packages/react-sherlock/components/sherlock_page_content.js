import React from 'react';
import { Helmet } from 'react-helmet';
import SherlockGame from './sherlock_game';

import './sherlock_page_content.scss';

const SherlockPageContent = () => (
  <div className="sherlock-page-content">
    <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu&family=Ubuntu+Mono&display=swap" rel="stylesheet" />
    </Helmet>
    <h3 className="title">Sherlock</h3>
    <SherlockGame />
  </div>
);

export default SherlockPageContent;

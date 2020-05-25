/* eslint-disable react/display-name */
import React from 'react';
import FloodItPageContent from '@scott-m-sarsfield/floodit';
import PageWithHeader from '../../components/shared/page_with_header';

import './floodit.scss';

const FloodItPage = () => (
  <PageWithHeader className="floodit-page" activeNav="games">
    <div className="content">
      <h3 className="title">Flood It</h3>
      <FloodItPageContent />
    </div>
  </PageWithHeader>
);

export default () => (
  <FloodItPage />
);

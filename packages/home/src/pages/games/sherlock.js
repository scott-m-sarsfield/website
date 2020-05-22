/* eslint-disable react/display-name */
import React from 'react';
import SherlockPageContent from '@scott-m-sarsfield/sherlock';
import PageWithHeader from '../../components/shared/page_with_header';

const SherlockPage = () => (
  <PageWithHeader className="games-page" activeNav="games">
    <div className="content">
      <SherlockPageContent />
    </div>
  </PageWithHeader>
);

export default () => (
  <SherlockPage />
);

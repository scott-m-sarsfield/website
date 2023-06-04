/* eslint-disable react/display-name */
import React from 'react';
import SherlockPageContent from '@scott-m-sarsfield/sherlock';
import PageWithHeader, {
  Head as CommonHead,
} from '../../components/shared/page_with_header';

import './sherlock.scss';

export const Head = () => <CommonHead />;

const SherlockPage = () => (
  <PageWithHeader className="sherlock-page" activeNav="games">
    <div className="content">
      <h3 className="title">Sherlock</h3>
      <SherlockPageContent />
    </div>
  </PageWithHeader>
);

export default () => <SherlockPage />;

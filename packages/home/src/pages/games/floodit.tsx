/* eslint-disable react/display-name */
import React from 'react';
import FloodItPageContent from '@scott-m-sarsfield/floodit';
import PageWithHeader, {
  Head as CommonHead,
} from '../../components/shared/PageWithHeader';

import './floodit.scss';

export const Head = () => <CommonHead />;

const FloodItPage = () => (
  <PageWithHeader className="floodit-page" activeNav="games">
    <div className="content">
      <h3 className="title">Flood It</h3>
      <FloodItPageContent />
    </div>
  </PageWithHeader>
);

export default () => <FloodItPage />;

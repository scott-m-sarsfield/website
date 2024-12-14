/* eslint-disable react/display-name */
import React from 'react';
import ThreeFiberPageContent from '@scott-m-sarsfield/three-fiber-test';
import { Head as CommonHead } from '../../components/shared/PageWithHeader';

export const Head = () => <CommonHead />;

const ThreeFiberPage = () => (
  <div>
    <ThreeFiberPageContent />
  </div>
);

export default () => <ThreeFiberPage />;

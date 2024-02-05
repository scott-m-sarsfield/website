import React from 'react';
import SherlockPageContent from '@scott-m-sarsfield/sherlock';
import { Head as CommonHead } from '../../components/shared/PageWithHeader';
import BannerMenuPage from '../../components/BannerMenuPage';

export const Head = () => <CommonHead />;

const SherlockPage = () => {
  return (
    <BannerMenuPage>
      <SherlockPageContent />
    </BannerMenuPage>
  );
};

export default SherlockPage;

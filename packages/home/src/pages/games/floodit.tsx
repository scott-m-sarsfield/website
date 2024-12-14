import React from 'react';
import styled from 'styled-components';
import FloodItPageContent from '@scott-m-sarsfield/floodit';
import { Head as CommonHead } from '../../components/shared/PageWithHeader';
import BannerMenuPage from '../../components/BannerMenuPage';

export const Head = () => <CommonHead />;

const StyledWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .floodit-page-content {
    height: 100%;
  }

  .floodit-game {
    height: 100%;
  }
`;

const FloodItPage = () => {
  return (
    <BannerMenuPage>
      <StyledWrapper>
        <FloodItPageContent />
      </StyledWrapper>
    </BannerMenuPage>
  );
};

export default FloodItPage;

import React from 'react';
import GamesPageContent from './GamesPageContent';
import PageWithHeader, { Head as CommonHead } from './shared/PageWithHeader';

export const Head = () => <CommonHead />;

const GamesPage = () => (
  <PageWithHeader className="games-page" activeNav="games">
    <div className="content">
      <GamesPageContent />
    </div>
  </PageWithHeader>
);

export default GamesPage;

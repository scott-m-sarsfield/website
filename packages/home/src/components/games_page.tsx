import React from 'react';
import GamesPageContent from './games_page_content';
import PageWithHeader, { Head as CommonHead } from './shared/page_with_header';

import './games_page.scss';

export const Head = () => <CommonHead />;

const GamesPage = () => (
  <PageWithHeader className="games-page" activeNav="games">
    <div className="content">
      <GamesPageContent />
    </div>
  </PageWithHeader>
);

export default GamesPage;

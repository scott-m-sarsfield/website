import React from 'react';
import GamesPageContent from './games_page_content';
import PageWithHeader from './shared/page_with_header';

import './games_page.scss';

const GamesPage = () => (
  <PageWithHeader className="games-page" activeNav="games">
    <div id="content">
      <GamesPageContent />
    </div>
  </PageWithHeader>
);

export default GamesPage;

import React from 'react';
import AppsPageContent from './apps_page_content';
import PageWithHeader from './shared/page_with_header';

import './games_page.scss';

const AppsPage = () => (
  <PageWithHeader className="games-page" activeNav="apps">
    <div className="content">
      <AppsPageContent />
    </div>
  </PageWithHeader>
);

export default AppsPage;

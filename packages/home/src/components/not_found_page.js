import React from 'react';
import PageWithHeader from './shared/page_with_header';

import './not_found_page.scss';

const NotFoundPage = () => (
  <PageWithHeader className="not-found-page main-page" title="File Not Found">
    <div className="pic-and-blurb">
      <div className="blurb">
        <h2>Heh... Not Quite There Yet</h2>
        <br />
        Come back in a bit to see if I get something going here.
        <br />
        <br />
        Email me (
        <a href="mailto:scott.m.sarsfield@gmail.com">
          scott.m.sarsfield@gmail.com
        </a>
        ) if this persists.
      </div>
    </div>
  </PageWithHeader>
);

export default NotFoundPage;

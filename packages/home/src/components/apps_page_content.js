import React from 'react';
import orderBy from 'lodash/orderBy';
import APPS from '../data/apps';
import AppGallery from './app_gallery';

const AppsPageContent = () => (
  <div className="row">
    {
      orderBy(APPS, ['archived'], ['asc']).map(({ archived, name, description, href, logoSrc, screenshots }, i) => (
        <AppGallery key={i} {...{
          archived,
          name,
          description,
          href,
          logoSrc,
          screenshots
        }} />
      ))
    }
  </div>
);

export default AppsPageContent;

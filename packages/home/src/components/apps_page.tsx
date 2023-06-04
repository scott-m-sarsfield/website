import React from 'react';
import orderBy from 'lodash/orderBy';
import kebabCase from 'lodash/kebabCase';
import APPS from '../data/apps';
import AppGallery from './app_gallery';
import AppGalleryTag from './app_gallery_tag';
import PageWithHeader, { Head as CommonHead } from './shared/page_with_header';

import './apps_page.scss';

export const Head = () => <CommonHead />;

const AppsPage = () => {
  const orderedApps = orderBy(APPS, ['archived'], ['asc']);

  return (
    <PageWithHeader className="apps-page" activeNav="apps">
      <div className="content">
        <div className="tag-row">
          {orderedApps.map(({ name, logoSrc }, i) => (
            <AppGalleryTag
              key={i}
              {...{
                id: kebabCase(name),
                name,
                logoSrc,
              }}
            />
          ))}
        </div>
        <div className="row">
          {orderedApps.map(
            (
              { archived, name, description, href, logoSrc, screenshots },
              i
            ) => (
              <AppGallery
                key={i}
                {...{
                  id: kebabCase(name),
                  archived,
                  name,
                  description,
                  href,
                  logoSrc,
                  screenshots,
                }}
              />
            )
          )}
        </div>
      </div>
    </PageWithHeader>
  );
};

export default AppsPage;

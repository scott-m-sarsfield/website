import React from 'react';
import orderBy from 'lodash/orderBy';
import kebabCase from 'lodash/kebabCase';
import { styled } from 'styled-components';
import APPS from '../data/apps';
import AppGallery from './AppGallery';
import AppGalleryTag from './AppGalleryTag';
import PageWithHeader, { Head as CommonHead } from './shared/PageWithHeader';

export const Head = () => <CommonHead />;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledTagRow = styled.div`
  display: none;

  @media (min-width: 850px) {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    overflow: hidden;
    white-space: normal;
  }
`;

const StyledContent = styled.div`
  overflow: hidden;
  padding-bottom: 2em;
  padding: 0 16px;

  @media (min-width: 850px) {
    max-width: 1200px;
    margin: auto;
  }
`;

const AppsPage = () => {
  const orderedApps = orderBy(APPS, ['archived'], ['asc']);

  return (
    <PageWithHeader activeNav="apps">
      <StyledContent>
        <StyledTagRow>
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
        </StyledTagRow>
        <StyledList>
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
        </StyledList>
      </StyledContent>
    </PageWithHeader>
  );
};

export default AppsPage;

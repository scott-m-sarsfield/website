import React from 'react';
import { styled } from 'styled-components';
import HeaderBar from './HeaderBar';
import Footer from './Footer';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export const Head = ({ title }: { title?: string }) => (
  <>
    {title ? <title>{title}</title> : null}
    <link
      href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
);

const PageWithHeader = ({
  className,
  children,
  activeNav,
}: React.PropsWithChildren<{
  className?: string;
  activeNav?: React.ComponentProps<typeof HeaderBar>['activeNav'];
}>) => (
  <StyledPage className={className}>
    <div className="page-header-and-content">
      <HeaderBar activeNav={activeNav} />
      {children}
    </div>
    <Footer />
  </StyledPage>
);

PageWithHeader.defaultProps = {
  title: 'Home of Scott M Sarsfield',
};

export default PageWithHeader;

import React from 'react';
import { styled, createGlobalStyle } from 'styled-components';
import HeaderBar from './HeaderBar';
import Footer from './Footer';
import corkboardBackground from '../../img/corkboard.jpg';

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
      href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Raleway:ital,wght@0,100..900;1,100..900&family=Judson:ital,wght@0,400;0,700;1,400&display=swap"
      rel="stylesheet"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
);

const GlobalStyles = createGlobalStyle`
html {
  scroll-behavior: smooth;
}

body {
  background: url(${corkboardBackground});
  background-position: top center;
  font-family: 'Lato', sans-serif;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

@media (min-width: 850px) {
  body {
    font-size: 20px;
  }
}

:root {
  --font-gloria: 'Gloria Hallelujah', sans-serif;
  --font-raleway: 'Raleway', sans-serif;
  --font-judson: 'Judson', serif;
}
`;

export const BasePage = ({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) => (
  <StyledPage className={className}>
    <div className="page-header-and-content">{children}</div>
    <Footer />
    <GlobalStyles />
  </StyledPage>
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
    <GlobalStyles />
  </StyledPage>
);

export default PageWithHeader;

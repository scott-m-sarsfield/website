import React from 'react';
import types from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import { styled } from 'styled-components';

const StyledHeaderBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Gloria Hallelujah', sans-serif;
  padding: 32px 0;
  gap: 16px;

  a {
    text-decoration: none;
    color: black;
  }
`;

const DESKTOP = `(min-width: 850px)`;

const StyledNavLink = styled(Link)`
  font-family: 'Gloria Hallelujah', sans-serif;
  padding: 10px 10px;
  line-height: 36px;
  box-sizing: border-box;

  background: #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);

  &[data-active] {
    background: white;
    box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.4);
    top: 2px;
  }
`;

const StyledNavigation = styled.div`
  display: none;

  @media ${DESKTOP} {
    display: flex;
    gap: 16px;
  }
`;

const StyledLogo = styled.div`
  background: white;
  padding: 4px 32px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
`;

const StyledHeader = styled.h1`
  padding: 0;
  margin: 0;
  letter-spacing: 1px;
  color: black;
  font-weight: normal;
`;

type Nav = 'games' | 'apps';

const HeaderBar = ({ activeNav }: { activeNav?: Nav }) => (
  <StyledHeaderBar>
    <StyledLogo>
      <Link to="/">
        <StyledHeader>Scott M Sarsfield</StyledHeader>
      </Link>
    </StyledLogo>
    <StyledNavigation>
      <StyledNavLink
        data-active={activeNav === 'games' || undefined}
        to="/games"
      >
        <h2>Games</h2>
      </StyledNavLink>
      <StyledNavLink data-active={activeNav === 'apps' || undefined} to="/apps">
        <h2>Apps</h2>
      </StyledNavLink>
      <StyledNavLink
        as="a"
        href="https://github.com/scott-m-sarsfield"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>GitHub</h2>
      </StyledNavLink>
      <StyledNavLink
        as="a"
        href="https://www.linkedin.com/in/scottmsarsfield"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>LinkedIn</h2>
      </StyledNavLink>
    </StyledNavigation>
  </StyledHeaderBar>
);

HeaderBar.propTypes = {
  activeNav: types.string,
};

export default HeaderBar;

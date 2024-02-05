import React from 'react';
import types from 'prop-types';
import { Link } from 'gatsby';

import { styled } from 'styled-components';
import { DESKTOP_SIZE } from './constants';

const StyledHeaderBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;
  gap: 16px;
`;

const StyledNavLink = styled(Link)`
  font-family: 'Gloria Hallelujah', sans-serif;
  padding: 10px 10px;
  line-height: 36px;
  box-sizing: border-box;
  text-align: center;

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
  display: grid;
  align-self: stretch;
  padding: 0 32px;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  a {
    text-decoration: none;
    color: inherit;
  }

  @media ${DESKTOP_SIZE} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StyledLogo = styled(Link)`
  background: white;
  padding: 4px 32px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
  text-align: center;
  font-family: var(--font-gloria);
  display: inline-flex;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const StyledHeader = styled.h1`
  padding: 0;
  margin: 0;
  letter-spacing: 1px;
  color: black;
  font-weight: normal;
  font-family: var(--font-gloria);
`;

type Nav = 'games' | 'apps';

export const Logo = () => (
  <StyledLogo to="/">
    <StyledHeader>Scott M Sarsfield</StyledHeader>
  </StyledLogo>
);

export const Navigation = ({ activeNav }: { activeNav?: Nav }) => (
  <StyledNavigation>
    <StyledNavLink data-active={activeNav === 'games' || undefined} to="/games">
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
);

const HeaderBar = ({ activeNav }: { activeNav?: Nav }) => (
  <StyledHeaderBar>
    <Logo />
    <Navigation activeNav={activeNav} />
  </StyledHeaderBar>
);

HeaderBar.propTypes = {
  activeNav: types.string,
};

export default HeaderBar;

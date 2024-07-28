import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faGamepad,
  faFolder,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

import {
  faLinkedin,
  faGithub,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import Drawer from '@mui/material/Drawer';
import { BasePage, Head as CommonHead } from './shared/PageWithHeader';

export const Head = () => <CommonHead />;

const StyledIconButton = styled.button`
  appearance: none;
  border: none;
  background: none;
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  font-size: 20px;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const StyledPage = styled(BasePage)`
  overflow: hidden;

  > :has(.page-header-and-content) {
    height: 100%;
    overflow: hidden;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const StyledHeaderBanner = styled.div`
  height: 60px;
  background-color: #333;
  color: white;
  letter-spacing: 2px;
  font-family: var(--font-gloria);
  font-size: 24px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 60px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledContent = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  min-height: 0;

  display: flex;
  flex-direction: column;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: #333;
    color: white;
    min-width: 300px;
    box-sizing: border-box;

    letter-spacing: 2px;
    font-family: var(--font-gloria);
    font-size: 24px;
  }
`;

const StyledDrawerTitle = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 6px 0;
  margin-bottom: 12px;

  &::after {
    content: '';
    border-bottom: 1px solid white;
    width: calc(100% - 36px);
    position: absolute;
    bottom: 0;
  }
`;

const StyledDrawerLink = styled.a`
  display: flex;
  height: 40px;
  align-items: center;
  gap: 20px;
  color: white;
  padding: 8px 24px;
  font-size: 22px;

  &:hover {
    background-color: #222;
  }

  &:active {
    background-color: #111;
  }

  > :nth-child(2) {
    flex-grow: 1;
  }
`;

const StyledExternalIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
`;

const StyledCopyrightFooter = styled.div`
  flex-grow: 1;
  flex-basis: auto;
  min-height: 40px;
  font-family: var(--font-raleway);
  font-size: 16px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
  align-items: center;
`;

const DrawerLink = ({
  icon,
  to,
  label,
  external,
}: {
  icon: IconDefinition;
  to: string;
  label: string;
  external?: boolean;
}) => {
  if (!external) {
    return (
      <StyledDrawerLink as={Link} to={to}>
        <FontAwesomeIcon icon={icon} />
        <div>{label}</div>
      </StyledDrawerLink>
    );
  }
  return (
    <StyledDrawerLink href={to} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={icon} />
      <div>{label}</div>
      <StyledExternalIcon icon={faArrowUpRightFromSquare} />
    </StyledDrawerLink>
  );
};

const BannerMenuPage = ({ children }: React.PropsWithChildren<{}>) => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <StyledPage>
      <StyledWrapper>
        <StyledHeaderBanner>
          <StyledIconButton
            onClick={() => {
              setNavOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </StyledIconButton>
          <div>Scott M Sarsfield</div>
        </StyledHeaderBanner>
        <StyledDrawer
          anchor="left"
          open={navOpen}
          onClose={() => {
            setNavOpen(false);
          }}
        >
          <StyledDrawerTitle>Scott M Sarsfield</StyledDrawerTitle>
          <DrawerLink to="/" icon={faHome} label="Home" />
          <DrawerLink to="/games" icon={faGamepad} label="Games" />
          <DrawerLink to="/apps" icon={faFolder} label="Apps" />
          <DrawerLink
            to="https://github.com/scott-m-sarsfield"
            icon={faGithub}
            label="GitHub"
            external
          />
          <DrawerLink
            to="https://www.linkedin.com/in/scottmsarsfield"
            icon={faLinkedin}
            label="LinkedIn"
            external
          />
          <StyledCopyrightFooter>
            &copy; 2024 Scott M Sarsfield
          </StyledCopyrightFooter>
        </StyledDrawer>
        <StyledContent>{children}</StyledContent>
      </StyledWrapper>
    </StyledPage>
  );
};

export default BannerMenuPage;

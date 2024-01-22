import React from 'react';
import { styled } from 'styled-components';
import { BasePage, Head as CommonHead } from './shared/PageWithHeader';
import profileImage from '../img/profile.png';
import { Logo, Navigation } from './shared/HeaderBar';
import { DESKTOP_SIZE, TABLET_SIZE } from './shared/constants';

export const Head = () => <CommonHead />;

const StyledBlurb = styled.div`
  padding: 32px;
  color: rgb(42, 42, 42);
  background-color: white;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
  border: none;

  font-family: var(--font-raleway);
  font-size: 20px;
  line-height: 1.4em;

  a {
    color: #00aaba;
  }
`;

const StyledProfileImage = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: white;

  padding: min(7vw, 32px) min(7vw, 32px) 0 min(7vw, 32px);
  margin: auto;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
  max-width: 350px;

  img {
    width: 100%;
    border: 1px inset rgba(0, 0, 0, 0.4);
  }

  @media ${TABLET_SIZE} {
    transform: rotate(5deg);
    margin: 16px auto;
  }

  @media ${DESKTOP_SIZE} {
    transform: rotate(5deg);
    padding: 16px 16px 0 16px;
    margin: auto;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);

    img {
      width: 200px;
      margin: auto;
      text-align: center;
      display: block;
      border: 1px inset rgba(0, 0, 0, 0.4);
    }
  }
`;

const StyledPhotoLabel = styled.div`
  display: block;
  font-size: clamp(16px, 6vw, 24px);
  padding: 12px;
  text-align: center;
  font-family: var(--font-gloria);
  line-height: 1.4em;

  @media (min-width: 850px) {
    font-size: 16px;
  }
`;

const StyledPicAndBlurb = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 32px;

  @media (min-width: 850px) {
    margin: auto;
    margin-top: 30px;
    max-width: 920px;
    flex-direction: row;
    align-items: flex-start;
    gap: 64px;
    padding: 0 48px 32px 32px;
  }
`;

const Blurb = () => (
  <StyledBlurb>
    Thanks for checking out my website. It's barely been updated since I started
    working, but I hope to refine it over time.
    <br />
    <br />I graduated with a Masters in Computer Science and Engineering from
    Santa Clara University. Working full-time at{' '}
    <a href="https://www.verkada.com/">Verkada</a> since September 2021.
    <br />
    <br />
    Contact me at{' '}
    <a href="mailto:scott.m.sarsfield@gmail.com">
      scott.m.sarsfield@gmail.com
    </a>{' '}
    if you want to get in touch. (Or use any of the links above.)
  </StyledBlurb>
);

const ProfilePhoto = () => (
  <StyledProfileImage>
    <img src={profileImage} alt="Scott M Sarsfield (Me)" />
    <StyledPhotoLabel>
      Scott M Sarsfield
      <br />
      Software Engineer
      <br />
      Verkada
    </StyledPhotoLabel>
  </StyledProfileImage>
);

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;
  gap: 32px;

  @media ${DESKTOP_SIZE} {
    gap: 16px;
  }
`;

const StyledMobile = styled.div`
  display: contents;

  @media ${DESKTOP_SIZE} {
    display: none;
  }
`;

const StyledDesktop = styled.div`
  display: none;

  @media ${DESKTOP_SIZE} {
    display: contents;
  }
`;

const HomePage = () => (
  <BasePage>
    <StyledContent>
      <Logo />
      <StyledMobile>
        <StyledPicAndBlurb>
          <ProfilePhoto />
        </StyledPicAndBlurb>
      </StyledMobile>
      <Navigation />
      <StyledPicAndBlurb>
        <Blurb />
        <StyledDesktop>
          <ProfilePhoto />
        </StyledDesktop>
      </StyledPicAndBlurb>
    </StyledContent>
  </BasePage>
);

export default HomePage;

import React from 'react';
import PageWithHeader, { Head as CommonHead } from './shared/page_with_header';
import profileImage from '../img/profile.png';

import { styled } from 'styled-components';

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
  display: block;
  position: relative;
  background: white;

  padding: 1em;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
  margin: auto;
  padding-bottom: 0em;

  img {
    width: 200px;
    margin: auto;
    text-align: center;
    display: block;
    border: 1px inset rgba(0, 0, 0, 0.4);
  }

  @media (min-width: 850px) {
    transform: rotate(5deg);
  }
`;

const StyledPhotoLabel = styled.div`
  display: block;
  font-size: 0.9em;
  padding: 0.7em;
  text-align: center;
  font-family: var(--font-gloria);
  line-height: 1.4em;
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

const StyledImageWRapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  flex-direction: column;
`;

const HomePage = () => (
  <PageWithHeader>
    <StyledPicAndBlurb>
      <StyledBlurb>
        Thanks for checking out my website. It's barely been updated since I
        started working, but I hope to refine it over time.
        <br />
        <br />I graduated with a Masters in Computer Science and Engineering
        from Santa Clara University. Working full-time at{' '}
        <a href="https://www.verkada.com/">Verkada</a> since September 2021.
        <br />
        <br />
        Contact me at{' '}
        <a href="mailto:scott.m.sarsfield@gmail.com">
          scott.m.sarsfield@gmail.com
        </a>{' '}
        if you want to get in touch. (Or use any of the links above.)
      </StyledBlurb>
      <StyledImageWRapper>
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
      </StyledImageWRapper>
    </StyledPicAndBlurb>
  </PageWithHeader>
);

export default HomePage;

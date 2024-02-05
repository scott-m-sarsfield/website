import React, { useState } from 'react';
import { styled } from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import Dialog from './library/Dialog';

const StyledArchiveNotice = styled.div`
  border: solid 1px black;
  padding: 15px;
  font-size: 14px;
  background-color: #eee;

  strong {
    margin-right: 10px;
  }
`;

const StyledAppGallery = styled.div`
  padding: 15px;
  background-color: white;
  font-family: 'Raleway', sans-serif;
  border-radius: 4px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 850px) {
    padding: 30px;
    gap: 30px;
  }
`;

const StyledLogo = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 30px;
`;

const StyledGalleryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLogoName = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLaunchButton = styled.a`
  button {
    appearance: none;
    font-size: 20px;
    line-height: 36px;
    padding: 0 20px;
    width: 100%;
    margin-top: 15px;
    border: solid 1px black;
    border-radius: 4px;
    background-color: #fc4;
    font-weight: bold;
  }

  @media (min-width: 850px) {
    button {
      width: auto;
      margin-top: 0;
    }
  }
`;

const StyledCarouselWrapper = styled.div`
  max-height: 90vh;
  overflow: auto;

  img {
    width: 100%;
    height: auto;
  }
`;

const ArchiveNotice = () => (
  <StyledArchiveNotice>
    <strong>Archived</strong>
    <br />
    This app no longer serves any practical purpose. Nonetheless, I will grant
    access to the repository upon request.
  </StyledArchiveNotice>
);

const StyledButton = styled.button`
  appearance: none;
  border: none;
  padding: 0;
  margin: 0;
  position: relative;

  &::after {
    content: 'View';
    display: none;
    justify-content: center;
    align-items: center;
    font-family: var(--font-raleway);
    font-size: 16px;
    letter-spacing: 2px;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }

  &:hover {
    &::after {
      display: flex;
    }
  }
`;

const StyledImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 32px;

  img {
    height: 100%;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: top;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
  }
`;

type Screenshot = {
  src: string;
  alt: string;
};

const AppGallery = ({
  id,
  archived,
  name,
  description,
  logoSrc,
  screenshots,
  href,
}: {
  id: any;
  archived: any;
  name: any;
  description: any;
  logoSrc: any;
  screenshots: Screenshot[];
  href: any;
}) => {
  const [modalScreenshot, setModalScreenshot] = useState<Screenshot | null>(
    null
  );

  return (
    <React.Fragment>
      <Dialog
        onClose={() => setModalScreenshot(null)}
        open={!!modalScreenshot}
        scroll="body"
      >
        <StyledCarouselWrapper>
          <img src={modalScreenshot?.src} alt={modalScreenshot?.alt} />
        </StyledCarouselWrapper>
      </Dialog>
      <StyledAppGallery id={id}>
        <StyledGalleryHeader>
          <StyledLogoName>
            <StyledLogo src={logoSrc} alt={name} />
            <h2 className="name"> {name} </h2>
          </StyledLogoName>
          {!archived ? (
            <StyledLaunchButton href={href}>
              <button>Launch</button>
            </StyledLaunchButton>
          ) : null}
        </StyledGalleryHeader>

        {archived ? <ArchiveNotice /> : null}

        <div>{description}</div>

        {isEmpty(screenshots) ? null : (
          <StyledImageGrid>
            {screenshots.map((screenshot, i) => (
              <StyledButton
                key={i}
                onClick={() => {
                  setModalScreenshot(screenshot);
                }}
              >
                <img src={screenshot.src} alt={screenshot.alt} />
              </StyledButton>
            ))}
          </StyledImageGrid>
        )}
      </StyledAppGallery>
    </React.Fragment>
  );
};

export default AppGallery;

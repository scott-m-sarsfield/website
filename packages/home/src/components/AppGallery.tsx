import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppsIcon from '@material-ui/icons/Apps';
import { styled } from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import Button from './library/Button';
import Dialog from './library/Dialog';
import Carousel from './library/Carousel';

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

const StyledViewGalleryButton = styled(Button)`
  max-width: 100%;
  overflow: hidden;
  max-height: 56.25vmin;
  position: relative;
  text-transform: none;

  .screen {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    display: flex;
    justify-content: space-around;

    .screen-label {
      margin: auto;
      font-size: 20px;
      display: flex;
      align-items: center;

      > *:first-child {
        margin-right: 10px;
      }
    }
  }

  @media (min-width: 850px) {
    .screen {
      background: rgba(0, 0, 0, 0.6);
    }
  }
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
  border: solid 1px black;

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
  screenshots: any;
  href: any;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 850px)');

  return (
    <React.Fragment>
      <Dialog
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        scroll="body"
      >
        <StyledCarouselWrapper>
          {isDesktop ? (
            <Carousel>
              {screenshots.map(({ src, alt }: any, i: number) => (
                <img key={i} src={src} alt={alt} />
              ))}
            </Carousel>
          ) : (
            <React.Fragment>
              {screenshots.map(({ src, alt }: any, i: number) => (
                <React.Fragment key={i}>
                  <img src={src} alt={alt} />
                  <hr />
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
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
          <div>
            <StyledViewGalleryButton onClick={() => setModalOpen(true)}>
              <img src={screenshots[0].src} alt="View Gallery" />
              <div className="screen">
                <div className="screen-label">
                  <AppsIcon fontSize="large" />
                  <span>View Gallery</span>
                </div>
              </div>
            </StyledViewGalleryButton>
          </div>
        )}
      </StyledAppGallery>
    </React.Fragment>
  );
};

export default AppGallery;

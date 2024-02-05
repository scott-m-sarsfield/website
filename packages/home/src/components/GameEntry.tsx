import React from 'react';
import types from 'prop-types';
import { styled } from 'styled-components';
import siteFavicon from '../img/favicon.png';

const StyledGameEntry = styled.div`
  background: white;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  padding: 32px;
  font-family: 'Raleway', sans-serif;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledLogo = styled.div`
  height: 50px;
  width: auto;
  max-width: 50px;
  border: 1px inset rgba(0, 0, 0, 0.4);

  img {
    max-height: 100%;
  }

  @media (min-width: 850px) {
    height: 100px;
    max-width: 100px;
  }
`;

const StyledTitleTags = styled.div`
  flex: 1 1 auto;
  min-width: 200px;
`;

const StyledTags = styled.div`
  font-size: 14px;
  font-style: italic;
  color: #444;
`;

const StyledPlayButton = styled.a`
  display: block;
  color: inherit;

  button {
    font-family: inherit;
    letter-spacing: 1px;
    background: #fc4;
    border: none;
    border-radius: 4px;
    padding: 4px 16px;
    font-size: 24px;
    font-weight: 600;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.4);
    float: right;
    width: 100%;
  }

  &:not([data-mobile]) {
    display: none;
  }

  @media (min-width: 850px) {
    &:not([data-mobile]) {
      display: block;
      flex: 0 0 auto;

      button {
        width: auto;
        font-size: 24px;
      }
    }

    &[data-mobile] {
      display: none;
    }
  }
`;

const StyledTopBar = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledDescription = styled.div`
  font-size: 18px;
`;

const GameEntry = (props: any) => {
  const { name, description, href, tags, buttonLabel, imgSrc } = props;

  return (
    <StyledGameEntry>
      <StyledTopBar>
        <StyledLogo>
          <img src={imgSrc} alt={name} />
        </StyledLogo>

        <StyledTitleTags>
          <div>{name}</div>
          <StyledTags>{tags.sort().join(', ')}</StyledTags>
        </StyledTitleTags>

        <StyledPlayButton href={href}>
          <button>{buttonLabel}</button>
        </StyledPlayButton>
      </StyledTopBar>

      <StyledDescription>{description}</StyledDescription>

      <StyledPlayButton data-mobile="mobile" href={href}>
        <button>{buttonLabel}</button>
      </StyledPlayButton>
    </StyledGameEntry>
  );
};

GameEntry.propTypes = {
  name: types.string.isRequired,
  description: types.string,
  href: types.string.isRequired,
  tags: types.arrayOf(types.string),
  buttonLabel: types.string,
  imgSrc: types.string,
};

GameEntry.defaultProps = {
  tags: [],
  buttonLabel: 'Play',
  imgSrc: siteFavicon,
};

export default GameEntry;

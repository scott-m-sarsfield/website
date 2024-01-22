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
  padding: 1em;
  font-family: 'Raleway', sans-serif;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledLogo = styled.div`
  height: 50px;
  width: auto;
  max-width: 50px;

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
  overflow: hidden;

  button {
    font-family: inherit;
    letter-spacing: 1px;
    background: #fc4;
    border: none;
    border-radius: 4px;
    padding: 0.25em 1em;
    font-size: 1.5em;
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
      margin-left: 15px;

      button {
        width: auto;
        font-size: 1.5em;
      }
    }

    &[data-mobile] {
      display: none;
    }
  }
`;

const StyledTopBar = styled.div`
  display: flex;
  gap: 15px;
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

      <div>{description}</div>

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

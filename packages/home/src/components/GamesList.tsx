import React from 'react';
import types from 'prop-types';
import { styled } from 'styled-components';
import GameEntry from './GameEntry';
import { DESKTOP_SIZE } from './shared/constants';

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 32px 32px;
  gap: 32px;

  @media ${DESKTOP_SIZE} {
    max-width: 960px;
    align-self: center;
    margin: auto;
  }
`;

const GamesList = ({ games, buttonLabel }: any) => {
  const _games = games.map(
    ({ name, href, tags, description, imgSrc }: any, i: number) => {
      return (
        <GameEntry
          key={i}
          {...{
            buttonLabel,
            name,
            href,
            tags,
            description,
            imgSrc,
          }}
        />
      );
    }
  );
  return <StyledList>{_games}</StyledList>;
};

GamesList.propTypes = {
  games: types.array,
  buttonLabel: types.string,
};

export default GamesList;

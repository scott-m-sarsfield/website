import React from 'react';
import types from 'prop-types';
import GameEntry from './game_entry';
import { styled } from 'styled-components';

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 32px;
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

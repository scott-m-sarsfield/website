import React from 'react';
import { styled } from 'styled-components';
import cardBackground from '../img/card.jpg';

type GameEntryProps = {
  name: string;
  description: string;
  href: string;
  tags: string[];
  imgSrc: string;
};

const StyledGameCard = styled.div`
  aspect-ratio: 2 / 3;
  background-color: #950;

  background: url(${cardBackground});
  font-family: var(--font-judson);
  padding: 8px;
  border-radius: 4px;
  border: 6px solid #1f2935;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;

  > * {
    flex: 0;
  }
`;

const StyledCardTitle = styled.div`
  border: 3px outset;
  border-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.3)
    rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  padding: 0 4px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.5px;

  &::first-letter {
    font-size: larger;
  }
`;

const StyledCardImage = styled.div`
  height: 250px;
  width: 250px;
  align-self: center;
  margin-top: 16px;
  margin-bottom: 8px;
  border: 6px outset grey;
  box-sizing: border-box;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledCardTags = styled.div`
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 800;
`;

const StyledCardDescription = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  min-height: 1px;

  font-size: 12px;

  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  padding: 4px 8px 12px;
  overflow: auto;
  text-overflow: ellipsis;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 2px;

  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
  margin: 5px;

  > :nth-child(2) {
    flex: 1;
    min-height: 0px;
    text-align: justify;
  }
`;

const StyledCardLink = styled.a`
  color: inherit;
  display: inline-block;
  position: relative;
  transition: top 500ms, box-shadow 500ms;
  top: 0;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);

  &:hover {
    top: -10px;
    box-shadow: 2px 6px 16px 6px rgba(0, 0, 0, 0.4);
  }
`;

const GameCard = (props: GameEntryProps) => {
  const { name, description, href, tags, imgSrc } = props;
  return (
    <StyledCardLink href={href}>
      <StyledGameCard>
        <StyledCardTitle>{name} </StyledCardTitle>
        <StyledCardImage>
          <img src={imgSrc} alt={name} />
        </StyledCardImage>
        <StyledCardDescription>
          <StyledCardTags>[ {tags.sort().join(' / ')} ]</StyledCardTags>
          <div>{description}</div>
        </StyledCardDescription>
      </StyledGameCard>
    </StyledCardLink>
  );
};

const GameEntry = (props: GameEntryProps) => {
  return <GameCard {...props} />;
};

export default GameEntry;

import React from 'react';
import types from 'prop-types';
import spadeIcon from '../../img/spade.png';
import heartIcon from '../../img/heart.png';
import clubIcon from '../../img/club.png';
import diamondIcon from '../../img/diamond.png';

import './playing_card.scss';

const SUITS = [
  {
    src: spadeIcon,
    alt: 'of Spades',
  },
  {
    src: heartIcon,
    alt: 'of Hearts',
  },
  {
    src: clubIcon,
    alt: 'of Clubs',
  },
  {
    src: diamondIcon,
    alt: 'of Diamonds',
  },
];

const CARDS = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];

function getCard(id) {
  const suit = SUITS[Math.floor(id / 13)];
  return {
    card: CARDS[id % 13],
    src: suit.src,
    alt: suit.alt,
  };
}

const PlayingCard = ({ number }) => {
  const { card, src, alt } = getCard(number);
  return (
    <div className="playing-card">
      <div className="center-content">
        <span className="card"> {card} </span>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

PlayingCard.propTypes = {
  number: types.number,
};

export default PlayingCard;

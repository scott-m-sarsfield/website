import React from 'react';
import NumberGuessIntroContent from './stages/number_guess_intro_content';
import NumberGuessLineupContent from './stages/number_guess_lineup_content';
import SherlockFrame from './sherlock_frame';

const SherlockGame = () => (
  <SherlockFrame >
    {/* <NumberGuessIntroContent /> */}
    <NumberGuessLineupContent />
  </SherlockFrame>
);

export default SherlockGame;

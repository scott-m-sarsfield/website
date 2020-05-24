import intersection from 'lodash/intersection';
import difference from 'lodash/difference';
import concat from 'lodash/concat';
import sortBy from 'lodash/sortBy';

export const stages = {
  INTRO: 'intro',
  LINEUP: 'lineup',
  REVEAL: 'reveal'
};

export const actions = {
  RESET: 'reset',
  START: 'start',
  ELIMINATE: 'eliminate',
  TOGGLE_ANIMATION: 'toggleAnimation'
};

export const initialState = {
  stage: stages.INTRO,
  possibleNumbers: [],
  displayedNumbers: [],
  animated: true,
  gameType: 'cards' // should be null
};

function oneTo100() {
  let arr = [];
  for (let i = 1; i <= 100; i++) {
    arr.push(i);
  }
  return arr;
}

function standardDeck() {
  let arr = [];
  for (let i = 0; i < 52; i++) {
    arr.push(i);
  }

  return arr;
}

function randomInt(start, endExclusive) {
  return Math.floor(Math.random() * (endExclusive - start)) + start;
}

function randomlyChoose(fromArray, count) {
  let len = fromArray.length;
  const copyArray = [];

  for (let i = 0; i < len; i++) {
    copyArray[i] = fromArray[i];
  }

  const chosenArray = [];

  for (let i = 0; i < count; i++) {
    const index = randomInt(0, len - i);
    chosenArray.push(copyArray[index]);
    copyArray[index] = copyArray[len - 1 - i];
  }

  return chosenArray;
}

const NUMBERS_PER_LINEUP = 25;
const CARDS_PER_LINEUP = 16;

function getTotalSlots(gameType) {
  return gameType === 'cards' ? CARDS_PER_LINEUP : NUMBERS_PER_LINEUP;
}

function getAllOptions(gameType) {
  return gameType === 'cards' ? standardDeck() : oneTo100();
}

const sherlockGameplay = {
  [actions.RESET]: () => {
    return { ...initialState };
  },
  [actions.START]: (state) => {
    const { gameType } = state;
    const possibleNumbers = getAllOptions(gameType);
    const displayedNumbers = sortBy(randomlyChoose(possibleNumbers, getTotalSlots(gameType)));

    return {
      ...state,
      stage: stages.LINEUP,
      possibleNumbers,
      displayedNumbers
    };
  },
  [actions.ELIMINATE]: (state, { numberDisplayed }) => {
    const { gameType } = state;
    const totalSlots = getTotalSlots(gameType);
    const allOptions = getAllOptions(gameType);
    const possibleNumbers = numberDisplayed ?
      intersection(state.possibleNumbers, state.displayedNumbers)
      :
      difference(state.possibleNumbers, state.displayedNumbers)
      ;

    const eliminatedNumbers = difference(allOptions, possibleNumbers);

    const possibleSlots = possibleNumbers.length / 2 > totalSlots ?
      totalSlots :
      Math.floor(possibleNumbers.length / 2);

    const displayedNumbers = sortBy(
      concat(
        randomlyChoose(possibleNumbers, possibleSlots),
        randomlyChoose(eliminatedNumbers, totalSlots - possibleSlots)
      )
    );

    return {
      ...state,
      stage: possibleNumbers.length === 1 ? stages.REVEAL : stages.LINEUP,
      possibleNumbers,
      displayedNumbers
    };
  },

  [actions.TOGGLE_ANIMATION]: (state) => (
    {
      ...state,
      animated: !state.animated
    }
  )
};

function sherlockReducer(state, action) {
  const { type, ...otherArgs } = action;
  return sherlockGameplay[action.type](state, otherArgs);
}

export default sherlockReducer;

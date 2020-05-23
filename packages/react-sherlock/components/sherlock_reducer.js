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
  animated: true
};

function oneTo100() {
  let arr = [];
  for (let i = 1; i <= 100; i++) {
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

const sherlockGameplay = {
  [actions.RESET]: () => {
    return { ...initialState };
  },
  [actions.START]: (state) => {
    const possibleNumbers = oneTo100();
    const displayedNumbers = sortBy(randomlyChoose(possibleNumbers, 25));

    return {
      ...state,
      stage: stages.LINEUP,
      possibleNumbers,
      displayedNumbers
    };
  },
  [actions.ELIMINATE]: (state, { numberDisplayed }) => {
    const possibleNumbers = numberDisplayed ?
      intersection(state.possibleNumbers, state.displayedNumbers)
      :
      difference(state.possibleNumbers, state.displayedNumbers)
      ;

    const eliminatedNumbers = difference(oneTo100(), possibleNumbers);

    const possibleSlots = possibleNumbers.length / 2 > 25 ? 25 : Math.floor(possibleNumbers.length / 2);

    const displayedNumbers = sortBy(
      concat(
        randomlyChoose(possibleNumbers, possibleSlots),
        randomlyChoose(eliminatedNumbers, 25 - possibleSlots)
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

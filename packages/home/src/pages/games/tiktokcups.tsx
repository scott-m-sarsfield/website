import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import random from 'lodash/random';

import { Head as CommonHead } from '../../components/shared/PageWithHeader';
import BannerMenuPage from '../../components/BannerMenuPage';
import { orderBy } from 'lodash';

export const Head = () => <CommonHead />;

const StyledWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled.div`
  background-color: white;
  flex-grow: 1;
`;

function randomSort(oldArray: string[]) {
  let array = [...oldArray];
  for (let max = array.length - 1; max > 0; max--) {
    const swapIndex = random(max);
    const temp = array[swapIndex];
    array[swapIndex] = array[max];
    array[max] = temp;
  }

  return array;
}

function useTikTokCupGame() {
  const [solution, setSolution] = useState(
    randomSort(['a', 'b', 'c', 'd', 'e'])
  );

  return {
    restart() {
      setSolution(randomSort(['a', 'b', 'c', 'd', 'e']));
    },
    check(guess: string[]) {
      return solution.reduce((nCorrect, value, index) => {
        return nCorrect + (value === guess[index] ? 1 : 0);
      }, 0);
    },
  };
}

const StyledCup = styled.div`
  height: 40px;
  width: 40px;
  border: 1px solid black;
  text-shadow: 1px 1px white, -1px -1px white, 1px -1px white, -1px 1px white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &[data-selected] {
    border-color: grey;
    box-shadow: 0 0 0 2px inset white;
  }

  &[data-code='a'] {
    background-color: red;
  }

  &[data-code='b'] {
    background-color: orange;
  }

  &[data-code='c'] {
    background-color: blue;
  }

  &[data-code='d'] {
    background-color: green;
  }

  &[data-code='e'] {
    background-color: black;
  }
`;

const StyledMiniCup = styled(StyledCup)`
  height: 20px;
  width: 20px;
`;

const StyledCups = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const CupsInput = ({
  guess,
  onChangeGuess,
}: {
  guess: string;
  onChangeGuess: (guess: string) => void;
}) => {
  const [selected, setSelected] = useState(-1);

  function handleClick(index: number) {
    if (selected >= 0) {
      const newGuess = [...guess.split('')];
      const temp = guess[selected];
      newGuess[selected] = newGuess[index];
      newGuess[index] = temp;
      onChangeGuess(newGuess.join(''));
      setSelected(-1);
      return;
    }
    setSelected(index);
  }
  return (
    <StyledCups>
      {guess.split('').map((l, i) => (
        <StyledCup
          key={i}
          data-code={l}
          onClick={() => handleClick(i)}
          data-selected={i === selected || undefined}
        />
      ))}
    </StyledCups>
  );
};

const StyledMiniCups = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const INITIAL_GUESS = 'abcde';

const StyledGuessGrid = styled.div`
  display: grid;
  grid-template-columns: 50px max-content max-content;
  align-items: center;
  gap: 10px;
  padding: 5px 20px;

  > :first-child {
    text-align: right;
    font-size: 14px;
    color: #333;
  }
`;

function getPermutations(str: string): string[] {
  if (!str) {
    return [''];
  }
  return str.split('').reduce((permutations, character, index) => {
    return [
      ...permutations,
      ...getPermutations(`${str.slice(0, index)}${str.slice(index + 1)}`).map(
        (p) => `${character}${p}`
      ),
    ];
  }, [] as string[]);
}

const StyledSolutionSpace = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const StyledAnalysisMiniCups = styled(StyledMiniCups)`
  padding: 5px;
  border-radius: 5px;
  justify-content: center;
  border: 1px solid transparent;

  &:hover {
    border-color: grey;
  }

  &[data-impossible] {
    & > * {
      opacity: 0.4;
    }
  }
`;

type Guesses = {
  guess: string;
  result: number;
}[];

// function isGuessPossible(guess: string, guesses: Guesses) {
//   const possibleSolution = guess.split('');
//   return guesses.every(({ guess, result }) => {
//     return (
//       possibleSolution.reduce((nCorrect, value, index) => {
//         return nCorrect + (value === guess[index] ? 1 : 0);
//       }, 0) === result
//     );
//   });
// }

function getGuessRejectionReason(
  guess: string,
  guesses: Guesses
): string | null {
  const possibleSolution = guess.split('');
  for (let i = 0; i < guesses.length; i++) {
    const g = guesses[i];
    const expected = possibleSolution.reduce((nCorrect, value, index) => {
      return nCorrect + (value === g.guess[index] ? 1 : 0);
    }, 0);
    if (expected !== g.result) {
      return `result mismatch for guess ${i + 1}; expected ${expected}`;
    }
  }
  return null;
}

const SolutionSpace = ({ guesses }: { guesses: Guesses }) => {
  const allGuesses = useMemo(() => {
    return getPermutations(INITIAL_GUESS);
  }, []);

  const analyses = useMemo(
    () =>
      orderBy(
        allGuesses.map((guess) => {
          const rejectionReason = getGuessRejectionReason(guess, guesses);
          return {
            guess,
            possible: !rejectionReason,
            reason: rejectionReason,
          };
        }),
        ['possible'],
        ['desc']
      ),
    [allGuesses, guesses]
  );
  const possibleCount = useMemo(
    () => analyses.filter(({ possible }) => possible).length,
    [analyses]
  );
  const allCount = useMemo(() => allGuesses.length, [allGuesses]);
  return (
    <>
      {possibleCount} / {allCount}
      <StyledSolutionSpace>
        {analyses.map((guess, i) => (
          <StyledAnalysisMiniCups
            key={i}
            data-impossible={!guess.possible || undefined}
            title={guess.reason ?? ''}
          >
            {guess.guess.split('').map((l, i) => (
              <StyledMiniCup key={i} data-code={l} />
            ))}
          </StyledAnalysisMiniCups>
        ))}
      </StyledSolutionSpace>
    </>
  );
};

const TikTokCupsContent = () => {
  const { restart, check } = useTikTokCupGame();
  const [guess, setGuess] = useState(INITIAL_GUESS);
  const [guesses, setGuesses] = useState<
    {
      guess: string;
      result: number;
    }[]
  >([]);

  function submitGuess() {
    const result = check(guess.split(''));

    setGuesses((guesses) => [
      ...guesses,
      {
        guess,
        result,
      },
    ]);
  }

  function handleRestart() {
    setGuess(INITIAL_GUESS);
    setGuesses([]);
    restart();
  }

  return (
    <StyledContent>
      <button onClick={handleRestart}>Restart</button>
      <div>
        <CupsInput guess={guess} onChangeGuess={(guess) => setGuess(guess)} />
        <button onClick={submitGuess}>Submit</button>
      </div>
      <div>
        <div>Guesses</div>
        <div>
          {guesses.map((guess, i) => (
            <StyledGuessGrid key={i}>
              <div>{i + 1}</div>
              <StyledMiniCups>
                {guess.guess.split('').map((l, i) => (
                  <StyledMiniCup key={i} data-code={l} />
                ))}
              </StyledMiniCups>
              <div>
                {'=> '}
                {guess.result}
              </div>
            </StyledGuessGrid>
          ))}
        </div>
      </div>
      <div>
        <div>Analysis</div>
        <SolutionSpace guesses={guesses} />
      </div>
    </StyledContent>
  );
};

const FloodItPage = () => {
  return (
    <BannerMenuPage>
      <StyledWrapper>
        <TikTokCupsContent />
      </StyledWrapper>
    </BannerMenuPage>
  );
};

export default FloodItPage;

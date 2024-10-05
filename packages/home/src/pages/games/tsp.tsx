import React, { ChangeEvent, useState, useMemo } from 'react';
import styled from 'styled-components';
import random from 'lodash/random';

import { Head as CommonHead } from '../../components/shared/PageWithHeader';
import BannerMenuPage from '../../components/BannerMenuPage';

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

type Vertex = [number, number];

const StyledCell = styled.div`
  border: 1px solid #f1f1f1;
  height: 8px;
  width: 8px;
`;

const StyledPoint = styled.div`
  position: absolute;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: red;
  transform: translate(-50%, -50%);

  &::after {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid red;
    content: '';
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`;

const StyledLine = styled.div`
  position: absolute;
  height: 3px;
  width: 3px;
`;

const StyledTopLabel = styled.div`
  position: absolute;
  top: -20px;
  font-size: 10px;
  transform: translate(-50%);
  background-color: rgba(255, 255, 255, 0.8);
`;

const StyledBottomLabel = styled.div`
  position: absolute;
  bottom: -20px;
  font-size: 10px;
  transform: translate(-50%);
  background-color: rgba(255, 255, 255, 0.8);
`;

type Path = [Vertex, Vertex];

const Grid = ({ points, paths }: { points: Vertex[]; paths: Path[] }) => {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(50, min-content)',
          }}
        >
          {new Array(50)
            .fill(1)
            .map((_, i) =>
              new Array(50)
                .fill(1)
                .map((_, j) => <StyledCell key={`${i}-${j}`} />)
            )}
        </div>
        {paths.map((path, i) => {
          const [[x, y], [x2, y2]] = path;
          const leftIndex = x > x2 ? 1 : 0;
          return (
            <React.Fragment key={'path' + i}>
              <StyledLine
                style={{
                  bottom: path[leftIndex][1] * 10 - 1.5,
                  left: path[leftIndex][0] * 10,
                  width: Math.abs(x2 - x) * 10,
                  backgroundColor: 'blue', //colors[i % 7],
                }}
              />
              <StyledLine
                style={{
                  bottom: Math.min(y, y2) * 10,
                  left: Math.max(x, x2) * 10 - 1.5,
                  height: Math.abs(y2 - y) * 10 + 1.5,
                  backgroundColor: 'blue', //colors[i % 7],
                }}
              />
            </React.Fragment>
          );
        })}
        {points.map(([x, y], i) => (
          <StyledPoint
            key={'point' + i}
            style={{ top: (50 - y) * 10, left: x * 10 }}
          >
            <StyledTopLabel>
              ({x},{y})
            </StyledTopLabel>
            <StyledBottomLabel>
              #{paths.findIndex(([[px, py]]) => px === x && py === y) + 1}
            </StyledBottomLabel>
          </StyledPoint>
        ))}
      </div>
    </div>
  );
};

const POINTS: Vertex[] = [
  [0, 0],
  [20, 20],
  [10, 20],
  [20, 10],
];

function makeNaivePath(points: Vertex[]): Path[] {
  return points.reduce((paths, point, index) => {
    if (index === points.length - 1) {
      paths.push([point, points[0]]);
    } else {
      paths.push([point, points[index + 1]]);
    }

    return paths;
  }, [] as Path[]);
}
// eslint-disable-next-line complexity
function getSmarterPath(points: Vertex[]): Path[] {
  const distances: { [distance: number]: Path[] } = {};

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = getManhattanDistance(points[i], points[j]);

      distances[distance] ??= [];
      distances[distance].push([points[i], points[j]]);
    }
  }

  const graphMap = new Map<Vertex, { chain: Vertex[] }>();

  for (const point of points) {
    graphMap.set(point, { chain: [point] });
  }

  const pathMap = new Map<Vertex, Vertex[]>();

  for (const point of points) {
    pathMap.set(point, []);
  }

  let nLinks = 0;

  for (
    let distance = 1;
    distance <= 100 && nLinks < points.length;
    distance++
  ) {
    if (!distances[distance]) {
      continue;
    }

    const paths = distances[distance];

    for (let p of paths) {
      const [a, b] = p;

      const entryA = graphMap.get(a);
      const entryB = graphMap.get(b);

      if (!entryA || !entryB) {
        // already connected
        continue;
      }

      if (entryA.chain[0] === b || entryA.chain.at(-1) === b) {
        // no premature cycles
        continue;
      }

      const newChain = [
        ...(entryA.chain[0] === a ? entryA.chain.reverse() : entryA.chain),
        ...(entryB.chain[0] === b ? entryB.chain : entryB.chain.reverse()),
      ];

      graphMap.delete(a);
      graphMap.delete(b);

      graphMap.set(newChain[0], { chain: newChain });
      graphMap.set(newChain.at(-1)!, { chain: newChain });
      nLinks++;
    }
  }

  const chain = Array.from(graphMap.values())[0]!.chain;

  const startIndex = chain.findIndex((v) => v === points[0]);

  console.log({ points, chain });

  return makeNaivePath([
    ...chain.slice(startIndex),
    ...chain.slice(0, startIndex),
  ]);
}

function makeRandomPoints(): Vertex[] {
  return [[0, 0] as Vertex].concat(
    new Array(10).fill(1).map(() => [random(0, 50), random(0, 50)])
  );
}

function getManhattanDistance(a: Vertex, b: Vertex) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function getTotalPathDistance(paths: Path[]): number {
  return paths.reduce((distance, path) => {
    return distance + getManhattanDistance(path[0], path[1]);
  }, 0);
}

const TravelingSalesmanContent = () => {
  const [pointText, setPointText] = useState(JSON.stringify(POINTS));
  const [points, setPoints] = useState(POINTS);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const raw = e.currentTarget.value;

    setPointText(raw);

    try {
      const points = JSON.parse(raw);
      setPoints(points);
    } catch (e) {
      /* do nothing */
    }
  };

  const handleClickRandomize = () => {
    const points = makeRandomPoints();

    setPoints(points);
    setPointText(JSON.stringify(points));
  };

  // const paths = useMemo(() => makeNaivePath(points), [points]);
  const paths = useMemo(() => getSmarterPath(points), [points]);

  const distance = useMemo(() => getTotalPathDistance(paths), [paths]);

  return (
    <StyledContent>
      <Grid points={points} paths={paths} />
      <div>Distance: {distance}</div>
      <div>Points</div>
      <div>
        <textarea value={pointText} onChange={handleChange} />
      </div>
      <button onClick={handleClickRandomize}>Randomize</button>
    </StyledContent>
  );
};

const TravelingSalesmanPage = () => {
  return (
    <BannerMenuPage>
      <StyledWrapper>
        <TravelingSalesmanContent />
      </StyledWrapper>
    </BannerMenuPage>
  );
};

export default TravelingSalesmanPage;

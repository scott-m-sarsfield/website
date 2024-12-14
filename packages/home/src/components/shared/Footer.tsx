import React, { useCallback, useState, useRef } from 'react';
import { styled } from 'styled-components';

const StyledFooter = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
  flex-wrap: wrap;
  margin: 16px 32px;
`;

const StyledCopyright = styled.div`
  text-align: right;
  background-color: white;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  padding: 8px 16px;
`;

function useMultipleClickHandler(
  callback: () => void,
  numberClicks: number = 5,
  timeoutMs: number = 1000
): () => void {
  const timeoutId = useRef<number | null>(null);
  const nClicks = useRef(0);

  return useCallback(() => {
    nClicks.current++;

    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    if (nClicks.current >= numberClicks) {
      callback();
      nClicks.current = 0;
      return;
    }

    timeoutId.current = window.setTimeout(() => {
      nClicks.current = 0;
      timeoutId.current = null;
    }, timeoutMs);
  }, []);
}

const ToggleableContent = ({
  specialContent,
  children,
}: React.PropsWithChildren<{ specialContent: React.ReactElement }>) => {
  const [toggled, setToggled] = useState(false);

  const onNthClick = useCallback(() => setToggled((toggled) => !toggled), []);
  const onClick = useMultipleClickHandler(onNthClick, 5);

  return <div onClick={onClick}>{toggled ? specialContent : children}</div>;
};

const Footer = () => (
  <StyledFooter>
    <ToggleableContent
      specialContent={
        <StyledCopyright>
          {`${process.env.GIT_BRANCH ?? '<branch>'} / ${
            process.env.GIT_HASH ?? '<hash>'
          }`}
        </StyledCopyright>
      }
    >
      <StyledCopyright>&copy; 2024 Scott M Sarsfield</StyledCopyright>
    </ToggleableContent>
  </StyledFooter>
);

export default Footer;

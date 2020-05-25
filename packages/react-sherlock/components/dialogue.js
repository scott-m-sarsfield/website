import React, { useEffect, useRef, useState } from 'react';
import types from 'prop-types';
import isString from 'lodash/isString';
import noop from 'lodash/noop';
import bigbear from './bigbear_sherlock.png';

const DialogueText = ({ children, onFinish = noop }) => {
  const finished = useRef(false);
  const timeoutId = useRef(null);
  const [displayCount, setDisplayCount] = useState(1);
  let childrenArray = React.Children.toArray(children);

  if (childrenArray.length === 1 && isString(childrenArray[0])) {
    childrenArray = childrenArray[0].split('');
  }

  const showNextChild = () => {
    if (!finished.current && displayCount < childrenArray.length) {
      setDisplayCount(displayCount + 1);
    } else if (!finished.current) {
      finished.current = true;
      onFinish();
    }
  };

  const handleFinish = () => {
    showNextChild();
  };

  useEffect(() => {
    if (childrenArray.length === 1) {
      if (isString(childrenArray[0])) {
        timeoutId.current = setTimeout(() => {
          showNextChild();
        }, 50);
      } else {
        showNextChild();
      }
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, []);

  if (childrenArray.length === 1) {
    return children;
  }

  const currentChildren = childrenArray.slice(0, displayCount).map((elm, i) => (
    <DialogueText key={i} onFinish={handleFinish}>
      {elm}
    </DialogueText>
  ));

  return currentChildren;
};

const Dialogue = ({ children, style, animated, showCharacter, ...otherProps }) => {
  return (
    <div style={{ position: 'relative' }}>
      {showCharacter && <img className="dialogue-character" src={bigbear} alt="Big Bear dressed as Sherlock" />}
      {
        animated ? (
          <div {...otherProps} style={{ ...style, position: 'relative' }}>
            <div style={{ visibility: 'hidden' }}>
              {children}
            </div>
            <div style={{ position: 'absolute', top: 10, left: 15, right: 15 }}>
              <DialogueText>
                {children}
              </DialogueText>
            </div>
          </div>
        ) : (
          <div {...otherProps} style={{ ...style, position: 'relative' }}>
            {children}
          </div>
        )
      }
    </div>
  );
};

Dialogue.propTypes = {
  children: types.node,
  style: types.object,
  animated: types.bool,
  showCharacter: types.bool
};

export default Dialogue;

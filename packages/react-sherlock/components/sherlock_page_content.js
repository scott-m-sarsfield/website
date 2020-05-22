import React, { useEffect, useRef, useState } from 'react';
import types from 'prop-types';
import { Helmet } from 'react-helmet';
import isString from 'lodash/isString';
import noop from 'lodash/noop';
import background from './sherlock-background.jpg';
import bigbear from './bigbear_sherlock.png';

import './sherlock_page_content.scss';

const DynamicBackground = ({ src, style, x, y, ...otherProps }) => {
  const styles = {
    backgroundImage: `url('${src}')`,
    backgroundSize: 'cover',
    backgroundPosition: `${x}% ${y}%`,
    ...style
  };

  return (
    <div {...{
      ...otherProps,
      style: styles
    }} />
  );
};

DynamicBackground.propTypes = {
  src: types.string.isRequired,
  style: types.object,
  x: types.number,
  y: types.number
};

DynamicBackground.defaultProps = {
  x: 50,
  y: 50
};

const bigBearStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  transform: 'translateY(20%)',
  maxWidth: '100%'
};

const jrpgtextStyles = {
  background: '#1111a7',
  color: 'white',
  margin: '20px 10px',
  padding: '10px 15px',
  border: '1px outset',
  borderRadius: 4,
  fontFamily: 'Ubuntu Mono, sans-serif',
  letterSpacing: 2
};

const DialogueText = ({ children, onFinish = noop }) => {
  const finished = useRef(false);
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
        setTimeout(() => {
          showNextChild();
        }, 50);
      } else {
        showNextChild();
      }
    }
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

const Dialogue = ({ children, style, ...otherProps }) => {
  return (
    <div {...otherProps} style={{ ...style, position: 'relative' }}>
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
      <div style={{ position: 'absolute', top: 10 }}>
        <DialogueText>
          {children}
        </DialogueText>
      </div>
    </div>
  );
};

const SherlockPageContent = () => (
  <div className="sherlock-page-content" style={{ margin: '0 20px' }}>
    <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu&family=Ubuntu+Mono&display=swap" rel="stylesheet" />
    </Helmet>
    <h3 style={{ marginBottom: 20, color: 'white', fontFamily: 'Poiret One, sans-serif' }}>Sherlock</h3>
    <DynamicBackground src={background} style={{ height: 500, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ ...jrpgtextStyles, background: 'rgb(9, 90, 16)' }}>221B Baker St.</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', flex: '1 1 auto' }}>
        <div style={{ flex: '0 0 33.333%' }}>
          <img src={bigbear} alt="Big Bear dressed as Sherlock" style={bigBearStyles} />
        </div>
        <div>
          <Dialogue style={jrpgtextStyles}>
            {`
            Hi.  I want you to think of a number between 1 and 100. 
          `}
            <br />
            <br />
            {
              `
          Then I will show you several line ups of numbers, and you will tell me if your number is in each line up.
        `}
            <br />
            <br />
            {`
        Then I will know your number.
      `}
            <br />
            <br />
          Ready?
          </Dialogue>
          <div style={{ ...jrpgtextStyles, display: 'flex', justifyContent: 'space-evenly' }}>
            <button className="sherlock-button">No</button>
            <button className="sherlock-button">Yes</button>
          </div>
        </div>
      </div>
    </DynamicBackground>
  </div>
);

export default SherlockPageContent;

import React from 'react';
import types from 'prop-types';
import { Helmet } from 'react-helmet';
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
          <div style={jrpgtextStyles}>
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
          </div>
          <div style={{ ...jrpgtextStyles, display: 'flex', justifyContent: 'space-evenly' }}>
            <button className="sherlock-button">Yes</button>
            <button className="sherlock-button">No</button>
          </div>
        </div>
      </div>
    </DynamicBackground>
  </div>
);

export default SherlockPageContent;

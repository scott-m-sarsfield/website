import React from 'react';
import types from 'prop-types';
import background from './sherlock-background.jpg';

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

const SherlockPageContent = () => (
  <div className="sherlock-page-content">
    <DynamicBackground src={background} style={{ height: 500, position: 'relative', margin: '40px', overflow: 'hidden' }} />
  </div>
);

export default SherlockPageContent;

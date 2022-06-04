import React from 'react';
import types from 'prop-types';

const DynamicBackground = ({ src, style, x, y, ...otherProps }) => {
  const styles = {
    backgroundImage: `url('${src}')`,
    backgroundSize: 'cover',
    backgroundPosition: `${x}% ${y}%`,
    ...style,
  };

  return (
    <div
      {...{
        ...otherProps,
        style: styles,
      }}
    />
  );
};

DynamicBackground.propTypes = {
  src: types.string.isRequired,
  style: types.object,
  x: types.number,
  y: types.number,
};

DynamicBackground.defaultProps = {
  x: 50,
  y: 50,
};

export default DynamicBackground;

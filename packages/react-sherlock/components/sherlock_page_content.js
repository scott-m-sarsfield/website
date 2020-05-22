import React, { useRef, useEffect } from 'react';
import types from 'prop-types';
import background from './sherlock-background.jpg';

import './sherlock_page_content.scss';

const DynamicBackground = ({ src, center }) => {
  const detector = useRef(null);
  const image = useRef(null);
  const detectorStyles = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1
  };
  const backgroundStyles = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
    maxWidth: 'none'
  };

  const calcStyles = () => {
    if (!detector.current || !image.current) {
      return;
    }
    const containerWidth = detector.current.clientWidth;
    const containerHeight = detector.current.clientHeight;
    const naturalWidth = image.current.naturalWidth;
    const naturalHeight = image.current.naturalHeight;

    const relativeSize = containerWidth / naturalWidth;
    const imageHeight = relativeSize * naturalHeight;
    const totalVerticalMargin = containerHeight - imageHeight;

    if (totalVerticalMargin < 0) {
      let marginTop = totalVerticalMargin * center[1];
      let marginBottom = totalVerticalMargin - marginTop;
      if (marginTop >= 0) {
        marginTop = 0;
        marginBottom = totalVerticalMargin;
      } else if (marginBottom >= 0) {
        marginBottom = 0;
        marginTop = totalVerticalMargin;
      }
      image.current.style.margin = `${marginTop}px 0 ${marginBottom}px 0`;
      image.current.style.height = 'auto';
      image.current.style.width = '100%';
    } else {
      const totalHorizontalMargin = containerWidth - naturalWidth * (containerHeight / naturalHeight);

      image.current.style.margin = `0 ${totalHorizontalMargin / 2}px 0 ${totalHorizontalMargin / 2}px`;
      image.current.style.height = '100%';
      image.current.style.width = 'auto';
    }
  };

  useEffect(() => {
    window.addEventListener('resize', calcStyles);
    calcStyles();

    () => {
      window.removeEventListener('resize', calcStyles);
    };
  }, [calcStyles]);

  return (
    <React.Fragment>
      <div style={detectorStyles} ref={detector} />
      <img src={src} alt="background" style={backgroundStyles} ref={image} />
    </React.Fragment>
  );
};

DynamicBackground.propTypes = {
  src: types.string.isRequired,
  center: types.arrayOf(types.number)
};

DynamicBackground.defaultProps = {
  center: [0.5, 0.5]
};

const SherlockPageContent = () => (
  <div className="sherlock-page-content">
    <div style={{ height: 500, background: 'white', position: 'relative', margin: '40px', overflow: 'hidden' }}>
      <DynamicBackground src={background} alt="Sherlock - Background" verticalCenter={0.55} />
    </div>
  </div>
);

export default SherlockPageContent;

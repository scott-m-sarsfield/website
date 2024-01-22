import React from 'react';
import types from 'prop-types';

import { styled } from 'styled-components';

const StyledGalleryTag = styled.a`
  background: white;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: black;
  padding: 10px;
  font-size: 16px;
  font-family: 'Raleway', sans-serif;
  border-radius: 8px;

  img {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    border-radius: 4px;
  }
`;

const AppGalleryTag = ({
  id,
  logoSrc,
  name,
}: {
  id: string;
  logoSrc: string;
  name: string;
}) => (
  <StyledGalleryTag href={`#${id}`}>
    <img src={logoSrc} alt={`Skip to ${name}`} />
    <span>{name}</span>
  </StyledGalleryTag>
);

AppGalleryTag.propTypes = {
  id: types.string.isRequired,
  logoSrc: types.string.isRequired,
  name: types.string.isRequired,
};

export default AppGalleryTag;

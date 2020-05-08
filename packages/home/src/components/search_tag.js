import React from 'react';
import types from 'prop-types';

const pillStyleOn = {
  float: 'left',
  background: '#777',
  padding: '0.25em',
  marginLeft: '0.25em',
  color: '#eee',
  borderRadius: '0.25em',
  border: 'solid 1px black',
  cursor: 'pointer'
};

const pillStyleOff = {
  float: 'left',
  padding: '0.25em',
  marginLeft: '0.25em',
  borderRadius: '0.25em',
  border: 'solid 1px black',
  cursor: 'pointer'
};

const SearchTag = ({ tag, active, onClick }) => (
  <div
    style={active ? pillStyleOn : pillStyleOff}
    onClick={onClick}>
    {tag}
  </div>
);

SearchTag.propTypes = {
  tag: types.string,
  active: types.bool,
  onClick: types.func.isRequired
};

export default SearchTag;

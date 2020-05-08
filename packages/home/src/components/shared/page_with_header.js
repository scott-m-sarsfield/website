import React from 'react';
import types from 'prop-types';
import { Helmet } from 'react-helmet';
import HeaderBar from './header_bar';

const PageWithHeader = ({ className, children, title, activeNav }) => (
  <div className={className}>
    <Helmet>
      <meta charset="utf-8" />
      <title>{title}</title>
      <link href="https://fonts.googleapis.com/css?family=Poiret+One|Lato" rel="stylesheet" type="text/css" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>

    <HeaderBar activeNav={activeNav}/>
    {children}
  </div>
);

PageWithHeader.propTypes = {
  className: types.string,
  children: types.node,
  title: types.string,
  activeNav: types.string
};

PageWithHeader.defaultProps = {
  title: 'Home of Scott M Sarsfield'
};

export default PageWithHeader;

import React from 'react';
import types from 'prop-types';
import { Helmet } from 'react-helmet';
import cx from 'classnames';
import HeaderBar from './header_bar';
import Footer from './footer';

import '../../styles/app.scss';
import './page_with_header.scss';

const PageWithHeader = ({ className, children, title, activeNav }) => (
  <div className={cx('page-with-header', className)}>
    <Helmet>
      <meta charset="utf-8" />
      <title>{title}</title>
      <link href="https://fonts.googleapis.com/css?family=Poiret+One|Lato" rel="stylesheet" type="text/css" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <div className="page-header-and-content">
      <HeaderBar activeNav={activeNav}/>
      {children}
    </div>
    <Footer />
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

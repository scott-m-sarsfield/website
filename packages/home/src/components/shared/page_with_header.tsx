import React from 'react';
import types from 'prop-types';
import cx from 'classnames';
import HeaderBar from './header_bar';
import Footer from './footer';

import '../../styles/app.scss';
import './page_with_header.scss';

export const Head = ({ title }: { title?: string }) => (
  <>
    {title ? <title>{title}</title> : null}
    <link
      href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
);

const PageWithHeader = ({
  className,
  children,
  activeNav,
}: React.PropsWithChildren<{ className?: string; activeNav: any }>) => (
  <div className={cx('page-with-header', className)}>
    <div className="page-header-and-content">
      <HeaderBar activeNav={activeNav} />
      {children}
    </div>
    <Footer />
  </div>
);

PageWithHeader.propTypes = {
  className: types.string,
  children: types.node,
  title: types.string,
  activeNav: types.string,
};

PageWithHeader.defaultProps = {
  title: 'Home of Scott M Sarsfield',
};

export default PageWithHeader;

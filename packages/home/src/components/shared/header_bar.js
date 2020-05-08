import React from 'react';
import types from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';

import './header_bar.scss';

const HeaderBar = ({ activeNav }) => (
  <div className="header-bar">
    <div className="logo">
      <Link to="/"><h1 className="header">Scott M Sarsfield</h1></Link>
    </div>
    <div className="navigation">

      <Link className={cx('nav-link', { active: activeNav === 'games' })} to="/games">
        <h2 >Games</h2>
      </Link>
      <Link className={cx('nav-link', { active: activeNav === 'apps' })} to="/apps">
        <h2>Apps</h2>
      </Link>
      <a className="nav-link" href="https://github.com/scott-m-sarsfield">
        <h2 >GitHub</h2>
      </a>
      <a className="nav-link" href="https://www.linkedin.com/in/scottmsarsfield">
        <h2 >LinkedIn</h2>
      </a>
    </div>
  </div>
);

HeaderBar.propTypes = {
  activeNav: types.string
};

export default HeaderBar;

import React from 'react';
import { Link } from 'gatsby';

import './footer.scss';

const Footer = () => (
  <div className="footer">
    <div className="navigation">
      <Link className="nav-link" to="/games">
        Games
      </Link>
      <Link className="nav-link" to="/apps">
        Apps
      </Link>
      <a
        className="nav-link"
        href="https://github.com/scott-m-sarsfield"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        className="nav-link"
        href="https://www.linkedin.com/in/scottmsarsfield"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </div>
    <div className="copyright">&copy; 2020 Scott M Sarsfield</div>
  </div>
);

export default Footer;

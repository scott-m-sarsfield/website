import React from 'react';
import types from 'prop-types';
import classNames from 'classnames';
import PageWithHeader from './shared/page_with_header';
import profileImage from '../img/profile.png';

import './home_page.scss';

const Egg = ({ color, letter }) => (
  <div className={classNames('egg', color)}>
    <div className="eggTop">{letter}</div>
    <div className="eggBottom" />
  </div>
);

Egg.propTypes = {
  color: types.string,
  letter: types.string.isRequired,
};

const HomePage = () => (
  <PageWithHeader className="main-page">
    <div className="pic-and-blurb">
      <div className="blurb">
        <b>Hi there!</b>
        <br />
        <br />
        Thanks for checking out my website.
        <br />
        <br />
        Graduated with a Masters in Computer Science and Engineering from Santa
        Clara University. Working full-time at{' '}
        <a href="https://www.verkada.com/">Verkada</a> since September 2021.
        <br />
        <br />
        Contact me at{' '}
        <a href="mailto:scott.m.sarsfield@gmail.com">
          scott.m.sarsfield@gmail.com
        </a>{' '}
        if you want to get in touch. (Or use any of the links above.)
        <br />
        <br />
      </div>
      <div className="profile-image-wrapper">
        <div className="profile-image">
          <img src={profileImage} alt="Scott M Sarsfield (Me)" />
          <div className="photo-label">
            Scott M Sarsfield
            <br />
            Software Engineer
            <br />
            Verkada
          </div>
        </div>
      </div>
    </div>
    <div className="eggWrapper">
      <Egg letter="S" />
      <Egg letter="C" color="pink" />
      <Egg letter="O" color="purple" />
      <Egg letter="T" color="blue" />
      <Egg letter="T" color="green" />
    </div>
  </PageWithHeader>
);

export default HomePage;

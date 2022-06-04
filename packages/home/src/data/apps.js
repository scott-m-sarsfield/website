import poolLogo from '@scott-m-sarsfield/pool/img/favicon.png';
import cleanSlateAPScores from '../img/cleanslate_ap_credit.png';
import cleanSlateMiscQuestions from '../img/cleanslate_misc.png';
import cleanSlateReview from '../img/cleanslate_review.png';
import cleanSlateLogo from '../img/cleanslate_logo.jpg';
import csfHomePage from '../img/csf_home_page.png';
import csfHealthBlurb from '../img/csf_health_blurb.png';
import csfMyAccount from '../img/csf_my_account_page.png';
import csfOrderPage from '../img/csf_order_page.png';
import csfReviewsPage from '../img/csf_reviews.png';
import csfCalorieTracking from '../img/csf_calorie_tracking.png';
import babypoolLogo from '../img/babypool_logo.png';
import babypoolScreenshot from '../img/babypool_screenshot.png';
import poolTwoMenu from '../img/pool2_menu.png';
import poolTwoIcon from '../img/pool2_icon.png';
import poolTwoCreateGame from '../img/pool2_create_game.png';
import poolTwoWaiting from '../img/pool2_waiting.png';
import poolTwoJoinGame from '../img/pool2_join_game.png';
import poolTwoBallsAssigned from '../img/pool2_balls_assigned.png';
import csfLogo from '../img/csf_logo.ico';

export default [
  {
    name: 'CleanSlate',
    description: `
        A utility to help incoming freshman engineering students decide which courses
         they should plan to take their freshman year. 
         Developed with Alek Hurst, Jordan Buschman and J.P. Ertola 
         for Software Engineering.
         `,
    href: '/apps/cleanslate',
    archived: true,
    logoSrc: cleanSlateLogo,
    screenshots: [
      {
        src: cleanSlateAPScores,
        alt: 'CleanSlate - AP Scores',
      },
      {
        src: cleanSlateMiscQuestions,
        alt: 'CleanSlate - Misc Questions',
      },
      {
        src: cleanSlateReview,
        alt: 'CleanSlate - Review',
      },
    ],
  },

  {
    name: 'Campus Smart Foods',
    description: `
        A simulation of a campus food ordering system that tracks user expenses
        and calories.

        Developed with Stefan Zecevic for Web Programming I.
        `,
    archived: true,
    href: '/apps/csf',
    logoSrc: csfLogo,
    screenshots: [
      {
        src: csfHomePage,
        alt: 'Campus Smart Foods - Home Page',
      },
      {
        src: csfHealthBlurb,
        alt: 'Campus Smart Foods - Health Page',
      },
      {
        src: csfMyAccount,
        alt: 'Campus Smart Foods - My Account Settings Page',
      },
      {
        src: csfOrderPage,
        alt: 'Campus Smart Foods - Order Page',
      },
      {
        src: csfReviewsPage,
        alt: 'Campus Smart Foods - Reviews Page',
      },
      {
        src: csfCalorieTracking,
        alt: 'Campus Smart Foods - Calorie Tracking Page',
      },
    ],
  },

  {
    name: 'Pool Picker',
    description: `
      A utility for the billiards game Knockout. Select the number of players (3 or 5), 
      then pass the device around until everyone knows their balls.
    `,
    archived: false,
    href: '/apps/pool',
    logoSrc: poolLogo,
    screenshots: [],
  },

  {
    name: 'Pool Picker 2',
    description: `
      A utility for the billiards game Knockout. 
      Select the number of balls per player and tell your friends on other devices to join the group. 
      Balls are assigned to each phone when group is ready.
    `,
    archived: true,
    href: '/apps/pool2',
    logoSrc: poolTwoIcon,
    screenshots: [
      {
        src: poolTwoMenu,
        alt: 'Pool Picker 2 - Menu',
      },
      {
        src: poolTwoCreateGame,
        alt: 'Pool Picker 2 - Create Game',
      },
      {
        src: poolTwoWaiting,
        alt: 'Pool Picker 2 - Waiting',
      },
      {
        src: poolTwoJoinGame,
        alt: 'Pool Picker 2 - Join Game',
      },
      {
        src: poolTwoBallsAssigned,
        alt: 'Pool Picker 2 - Balls Assigned',
      },
    ],
  },

  {
    name: 'BabyPool',
    description: `
      Leading up to the birth of my first-cousin-once-removed Vaughn, my mom asked if I could
      set up a baby pool to guess the height, weight, and date of his birth.  I was anxious to
      test my skills and I made this.  Unfortunately, I wasn't able to develop it fast enough
      to share before the date arrived. Se la vie.
    `,
    archived: true,
    href: '',
    logoSrc: babypoolLogo,
    screenshots: [
      {
        src: babypoolScreenshot,
        alt: 'BabyPool',
      },
    ],
  },
];

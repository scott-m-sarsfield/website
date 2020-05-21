import cleanSlateAPScores from '../img/cleanslate_ap_credit.png';
import cleanSlateMiscQuestions from '../img/cleanslate_misc.png';
import cleanSlateReview from '../img/cleanslate_review.png';
import csfHomePage from '../img/csf_home_page.png';
import csfHealthBlurb from '../img/csf_health_blurb.png';
import csfMyAccount from '../img/csf_my_account_page.png';
import csfOrderPage from '../img/csf_order_page.png';
import csfReviewsPage from '../img/csf_reviews.png';
import csfCalorieTracking from '../img/csf_calorie_tracking.png';

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
    logoSrc: 'http://scottmsarsfield.com/apps/cleanslate/images/scu_logo_large.jpg',
    screenshots: [
      {
        src: cleanSlateAPScores,
        alt: 'CleanSlate - AP Scores'
      },
      {
        src: cleanSlateMiscQuestions,
        alt: 'CleanSlate - Misc Questions'
      },
      {
        src: cleanSlateReview,
        alt: 'CleanSlate - Review'
      }
    ]
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
    logoSrc: 'http://scottmsarsfield.com/apps/csf/img/favicon.ico',
    screenshots: [
      {
        src: csfHomePage,
        alt: 'Campus Smart Foods - Home Page'
      },
      {
        src: csfHealthBlurb,
        alt: 'Campus Smart Foods - Health Page'
      },
      {
        src: csfMyAccount,
        alt: 'Campus Smart Foods - My Account Settings Page'
      },
      {
        src: csfOrderPage,
        alt: 'Campus Smart Foods - Order Page'
      },
      {
        src: csfReviewsPage,
        alt: 'Campus Smart Foods - Reviews Page'
      },
      {
        src: csfCalorieTracking,
        alt: 'Campus Smart Foods - Calorie Tracking Page'
      }
    ]
  },

  {
    name: 'Pool Picker',
    description: `
      A utility for the billiards game Knockout. Select the number of players (3 or 5), 
      then pass the device around until everyone knows their balls.
    `,
    archived: false,
    href: '/apps/pool',
    logoSrc: 'http://scottmsarsfield.com/games/pool/img/favicon.png',
    screenshots: []
  },

  {
    name: 'Pool Picker 2',
    description: `
      A utility for the billiards game Knockout. 
      Select the number of balls per player and tell your friends on other devices to join the group. 
      Balls are assigned to each phone when group is ready.
    `,
    archived: false,
    href: '/apps/pool2',
    logoSrc: 'http://scottmsarsfield.com/games/pool2/img/favicon.png',
    screenshots: []
  }

];

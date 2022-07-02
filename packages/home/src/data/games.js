import sherlockIcon from '../img/sherlock_icon.png';
import flooditIcon from '../img/floodit_icon.png';

export default [
  {
    name: 'Sherlock',
    tags: ['Remastered'],
    description: `
      My original Sherlock game, dubbed 'Sherlock Holmes and the Random Number', was my first venture into
      programming my own web-based games.  Inspired by a memory I had of a game I played at my aunt's that
      could miraculously guess my card, I wanted to recapture and share that experience.  (Especially when
      I learned about binary search in college.) I followed that up with 'Sherlock Holmes and the Mystery Card',
      also written in PHP to fully realize the vision.  Some time later, I developed SherlockX, tackling the same
      problem using JavaScript & jQuery, and now, to demonstrate some more modern experience, I present it once again
      as simply 'Sherlock', written in React.
    `,
    href: '/games/sherlock',
    imgSrc: sherlockIcon,
  },
  {
    name: 'Flood It',
    description:
      'A simple game where you attempt to change the color the fewest number of times to fill the entire grid.',
    tags: ['Remastered'],
    href: '/games/floodit',
    imgSrc: flooditIcon,
  },
];

import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `website2`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: false,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Scott M Sarsfield`,
        short_name: `ScottMSarsfield`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: './src/img/favicon.png',
      },
    },
  ],
};

export default config;

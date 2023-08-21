module.exports = () => ({
    publicRuntimeConfig: {
      NODE_ENV: process.env.NODE_ENV,
    },
    images: {
      domains: ['https://l.evidon.com', 'https://c.evidon.com', 'https://d3awvtnmmsvyot.cloudfront.net/api'],
    },
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }
);

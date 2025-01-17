// // next.config.js
// const { i18n } = require('./next-i18next.config')

// const nextConfig = {
//   reactStrictMode: true,
//   basePath: "/urbanregister", // staging
//   assetPrefix: "/urbanregister", // staging
//   reactStrictMode: true,
//   images: {
//     domains: ["localhost", "himstaging2.hp.gov.in"], // staging
//     // domains: ["localhost", ""], // local
//   },
//   flags: {
//     DEV_SSR: false,
//   },
//   i18n
// };

// module.exports = nextConfig;




// const path = require('path')
// const isProd = process.env.NODE_ENV === 'production'
// module.exports = {
//   webpack: config => {
//     config.resolve.modules.push(path.resolve('./'))

//     return config
//   }
// }

// @ts-check


// const { i18n } = require('./next-i18next.config.js');

// // You can remove the following 2 lines when integrating our example.
// const { loadCustomBuildParams } = require('./next-utils.config')
// const { esmExternals = false, tsconfigPath } =
//   loadCustomBuildParams()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },
  // i18n,
  reactStrictMode: true,
  typescript: {
    // tsconfigPath,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // staging
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH, // staging
  images: {
    domains: ["localhost", "himstaging2.hp.gov.in", "eparivarservice.hp.gov.in"], // staging
    // domains: ["localhost", ""], // local
  },

}

module.exports = nextConfig

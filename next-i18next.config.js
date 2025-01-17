const { getImagePath } = require('@/utils/CustomImagePath');

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === 'development',
  i18n: {
      defaultLocale: 'en',
      locales: ['en', 'hi'],
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
      typeof window === 'undefined'
          ? require('path').resolve(getImagePath('/public/locales'))
          :  getImagePath('/locales') ,

  reloadOnPrerender: process.env.NODE_ENV === 'development',

  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */
  // saveMissing: false,
  // strictMode: true,
  // serializeConfig: false,
  // react: { useSuspense: false }
}



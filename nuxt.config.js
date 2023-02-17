import metajs from './plugins/meta'
const isDev = process.env.NODE_ENV !== 'production'

const meta = metajs()
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    mode: 'hash',
    base: '/subway/',
    routerNameSplitter: '/',
    middleware: ['router']
  },
  env: {
    baseUrl: isDev ? 'http://localhost:8082/api/v1' : 'https://eppg.ngazi.co.tz/paymentGW/portal'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'NgaziTech: %s',
    title: 'NgaziTech',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      ...meta,
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: process.env.DEPLOY_ENV === 'prod' ? '/subway/favicon.ico' : '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/vuetify.js',
    '~/mixins/mixins.js',
    '~/plugins/vuepersistence.js',
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  /**
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true
  },
  proxy: {
    '/api/': { target: 'http://155.12.30.14:8082/api/v1', pathRewrite: { '^/api/': '' } }
  },
  **/
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: process.env.NODE_ENV === 'prod' ? '/subway/' : '/subway/',
    extend (config, ctx) { },
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    terser: {
      extractComments: false // default was LICENSES
    }
  },
  server: {
    port: 8000,
    host: '0.0.0.0'
  }
}

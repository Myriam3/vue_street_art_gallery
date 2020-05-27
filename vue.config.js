module.exports = {
  //Sub path for production only
  publicPath: process.env.NODE_ENV === 'production' ?
    '/production_street_art_vue/' : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/scss/base/_variables.scss";`,
      },
    },
  },
};
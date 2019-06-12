const path = require('path')


// function sass() {
//   const variables = `@import "./src/sass/_mixins.sass"`
//   const mixins = `@import "./src/sass/_variables.sass"`
//   return variables + mixins
// }
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': path.resolve('./node_modules/vue/dist/vue.common.js'),
      },
    },
  },
  // publicPath: process.env.NODE_ENV === 'production'
  publicPath: '/',
  // baseUrl: '/',
  css: {
    loaderOptions: {
      sass: {
        data:`@import "./src/sass/_variables.sass";@import "./src/sass/_mixins.sass";@import "./src/sass/_base.sass"`
      }
    }
  }
  //   ? '/vue/'
  //   : '/'
}

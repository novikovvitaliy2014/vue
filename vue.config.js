const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': path.resolve('./node_modules/vue/dist/vue.common.js'),
      }
    }
  },
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        data:`@import "./src/sass/_variables.sass";@import "./src/sass/_mixins.sass";@import "./src/sass/_base.sass"`
      }
    }
  }
}

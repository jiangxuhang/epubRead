module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  lintOnSave: false,
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxAssetSize: 524288,
      maxEntrypointSize: 524288
    }
  }
}

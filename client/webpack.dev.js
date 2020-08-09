const webpackCommon = require('./webpack.common.js')

module.exports = Object.assign(webpackCommon,{
    mode: 'development',
    devServer: {
        hot: true,
        open: true
    }
})
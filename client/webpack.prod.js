const webpackCommon = require('./webpack.common.js')

module.exports = Object.assign(webpackCommon,{
    mode: 'production',
})
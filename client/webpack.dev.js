const webpackCommon = require('./webpack.common.js')
console.log('run webpack dev')
module.exports = Object.assign(webpackCommon,{
    mode: 'development',
    devServer: {
        hot: true,
        open: true
    }
})
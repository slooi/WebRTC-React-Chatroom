const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname,'src','index.js'),
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        open: true
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    // options: {
                    //   presets: ['@babel/preset-env','@babel/preset-react']
                    // }
                }]
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader','css-loader']
            }
        ],
    },
    plugins:[new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'src','index.html')
    })]
}
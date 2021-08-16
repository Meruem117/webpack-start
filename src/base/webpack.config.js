const {
    resolve,
    join
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    mode: 'development',
    devServer: {
        contentBase: join(__dirname, 'build'),
        compress: true,
        port: 3500
    }
}
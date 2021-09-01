//* webpack.config.js for base
const {
    resolve,
    join
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

// process.env.NODE_ENV = 'development'

module.exports = {
    entry: ['./src/base/static/js/index.js', './src/base/index.html'],
    output: {
        filename: 'js/main.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }]
            },
            {
                oneOf: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [{
                            loader: 'babel-loader',
                            options: {}
                        }]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            // 'style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'postcss-loader'
                        ]
                    },
                    {
                        test: /\.(jpg|png|gif|ico)$/,
                        use: [{
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                esModule: false,
                                name: '[hash:10].[ext]',
                                outputPath: 'images'
                            }
                        }],
                        type: 'javascript/auto'
                    },
                    {
                        test: /\.html$/,
                        use: ['html-loader']
                    }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/base/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new OptimizeCssAssetsPlugin(),
        new CleanWebpackPlugin()
    ],
    mode: 'development',
    // mode: 'production',
    target: 'web',
    devServer: {
        contentBase: join(__dirname, 'build'),
        compress: true,
        port: 3500,
        // open:true,
        hot: true
    },
    devtool: 'source-map'
}
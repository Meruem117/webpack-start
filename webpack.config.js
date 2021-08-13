// webpack配置文件，默认采用commonjs
const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    // 入口起点
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'main.js',
        // __dirname代表当前文件目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    // loader配置
    module: {
        rules: [
            // 详细loader配置
            // 不同文件配置不同loader
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader处理
                // use数组中loader执行顺序：从右到左，从上到下依次执行
                use: [
                    // 创建style标签，将js中的样式资源进行插入，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件
                    'less-loader'
                ]
            },
            {
                // 处理图片资源，默认处理不了html中的img图片
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    // 图片大小小于8kb，就会被base64处理
                    // 优点：减少请求数量（减轻服务器压力） 缺点：图片体积变大（文件请求速度变慢）
                    limit: 8 * 1024,
                    // url-loader默认使用es6模块化解析，而html-loader引入图片的commonjs
                    // 关闭url-loader的es6模块化
                    esModule: false,
                    // 图片重命名，后缀相同，名字取hash值前十位
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html中的img图片（负责引入img，从而能被url-loader处理
                loader: 'html-loader'
            },
            {
                // 打包其他资源
                exclude: /\.(css|less|js|json|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    // plugins配置
    plugins: [
        // html-webpack-plugin 默认创建一个空的html，引入打包输出的所有资源
        new HtmlWebpackPlugin({
            // 复制模板文件，并自动引入打包输出的所有资源
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    // 模式
    mode: 'development',
    // mode: 'production'
    // 开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 只会在内存中编译打包，不会有任何输出
    // 启动devServer - npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        port: 3500
    }
}
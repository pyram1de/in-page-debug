const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname),
    mode: 'development',
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js', '.html', '.less'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'in-page-debug.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: [path.resolve(__dirname, 'src/index.html')]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                },{
                    loader: 'css-loader',
                },{
                    loader: 'less-loader',
                }]
        }]
    },
    devServer: {
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
    ]

}

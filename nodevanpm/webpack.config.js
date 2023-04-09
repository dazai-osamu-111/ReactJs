const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (env) => {
    console.log(process.env.NODE_ENV)
    const basePlugin = [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/template.html'
        })
    ]

    const isDevelopment = process.env.NODE_ENV === 'development'
    const plugins = isDevelopment? basePlugin : [...basePlugin, new BundleAnalyzerPlugin()]

    return {
        mode: 'development',
        entry: {
            app: path.resolve('src/index.js')
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            clean: true,
            assetModuleFilename: '[file]'
        },
        devtool: isDevelopment ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss|css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env', {
                                        debug: true,
                                        useBuiltIns: 'entry',
                                        corejs: '3.29.0'
                                    }
                                ]
                            ]
                        }
                    }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
                    type: 'asset/resource'
                }
            ]
        },

        plugins,
        devServer: {
            static: {
                directory: 'dist'
            },
            port: 3000,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true
        }
    }
}
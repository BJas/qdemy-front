const path = require('path')
const glob = require('glob')

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    webpack: (config, { dev }) => {
        config.module.rules.push({
            test: /\.s?css$/,
            loader: 'emit-file-loader',
            options: {
                name: 'dist/[path][name].[ext]',
            },
        });

        if (!dev) {
            config.module.rules.push({
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                modules: false,
                                url: true,
                                sourceMap: false,
                                minimize: true,
                                localIdentName: false
                                    ? "[name]__[local]___[hash:base64:5]"
                                    : '[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [
                                    autoprefixer(),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [
                                    path.resolve(__dirname, 'scss'),
                                    path.resolve(__dirname, 'pages'),
                                ],
                            },
                        },
                    ],
                }),
            });

            config.plugins.push(new ExtractTextPlugin('app.css'));
        } else {
            config.module.rules.push({
                test: /\.s?css$/,
                use: [
                    { loader: 'raw-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: 'inline',
                            plugins: () => [
                                autoprefixer(),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            });
        }

        return config;
    },
};
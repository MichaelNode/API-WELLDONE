

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: 'development',
    module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
             loader: "babel-loader"
           }
         },
         {
            test: /\.s(a|c)ss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
            }, {
                loader: "postcss-loader",
                options: {
                    plugins: () => [ require('precss'), require('autoprefixer') ]
                }
            }, {
                loader: "sass-loader"
            }]
        }
       ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
    })
    ]
 }

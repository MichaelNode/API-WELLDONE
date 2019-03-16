

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
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: { importLoaders: 1 }
            }, {
                loader: "postcss-loader",
                options: { parser: 'sugarss', exec: true, plugins: function () {
                    return [
                        require('precss'),
                        require('autoprefixer')
                    ];  
                } }
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
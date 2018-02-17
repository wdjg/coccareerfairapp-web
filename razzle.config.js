const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const razzleHeroku = require('razzle-heroku');
const util = require('util')

var fs = require('fs');
var log_file = fs.createWriteStream('e:/foo.js', {flags : 'w'});
var log_stdout = process.stdout;


module.exports = {
  modify: (config, {target, dev}, webpack) => {
    // fs.appendFile("e:\\foo.js", "\n\n\n===========\n" + util.inspect(config, {showHidden: false, depth: null,showProxy: true}), () => {});
    const appConfig = Object.assign({}, config);
    if (target == 'web' && !dev)
      appConfig.module.rules[4].use = ExtractTextPlugin.extract({
      fallback: require.resolve('style-loader'),
      use: [
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            minimize: !dev,
          },
        },
        'postcss-loader',
      ],
    });
    // appConfig.plugins = [...appConfig.plugins, new ExtractTextPlugin({
    //    filename: 'static/css/bundle.[contenthash:8].css',
    //    id: 1,
    //    options: {} 
    //  })];
    // const appConfig = razzleHeroku(config, {target, dev}, webpack);
    // console.log(appConfig)
    fs.appendFile("e:\\foo.js", "\n\n\n===========\n" + util.inspect(appConfig, {showHidden: false, depth: null,showProxy: true}), () => {});
    
    if (target == 'web' && dev)
      appConfig.module.rules[4].use[2].options.plugins = () => [
        nested(),
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9',
          ],
          flexbox: 'no-2009',
        }),
      ];
    return appConfig;
  }
}
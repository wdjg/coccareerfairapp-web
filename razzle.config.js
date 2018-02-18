const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const razzleHeroku = require('razzle-heroku');
const vars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');
const util = require('util');


module.exports = {
  modify: (config, {target, dev}, webpack) => {
    // var fs = require('fs');
    // var log_file = fs.createWriteStream('e:/foo.js', {flags : 'w'});
    // var log_stdout = process.stdout;
    // fs.appendFile("e:\\foo.js", "\n\n\n===========\n" + util.inspect(config, {showHidden: false, depth: null,showProxy: true}), () => {});
    const appConfig = razzleHeroku(Object.assign({}, config), {target, dev}, webpack);
    // appConfig.module.rules.push({
    //   test: /\.svg$/,
    //   use: [
    //     'svg-inline-loader'
    //   ],
    // });
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
    // console.log(appConfig)
    // fs.appendFile("e:\\foo.js", "\n\n\n===========\n" + util.inspect(appConfig, {showHidden: false, depth: null,showProxy: true}), () => {});
    
    if (target == 'web' && dev)
      appConfig.module.rules[4].use[2].options.plugins = () => [
        postcssImport(),
        nested(),
        vars(),
        require('postcss-flexbugs-fixes'),
        autoprefixer(),
      ];
    return appConfig;
  }
}
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
    const appConfig = razzleHeroku(Object.assign({}, config), {target, dev}, webpack);
    // appConfig.module.rules.splice(0, 0, {
    //   test: /\.(gif|jpe?g|png|ico)$/,
    //   loader: 'url-loader?limit=10000',
    //   options: {
    //     limit: 10000,
    //     name: 'static/media/[name].[hash:8].[ext]',
    //   },
    // });
    // appConfig.module.rules.splice(1, 0, {
    //   test: /\.(otf|eot|ttf|svg|woff|woff2).*$/,
    //   loader: 'url-loader?limit=10000',
    //   options: {
    //     limit: 10000,
    //     name: 'static/media/[name].[hash:8].[ext]',
    //   },
    // });
    // console.log(dev, target)
    // console.log(util.inspect(appConfig.module.rules, {showHidden: false, depth: null, showProxy: true}))
    if (target == 'web' && !dev)
      appConfig.module.rules[4].use[3].options.plugins = () => [
        postcssImport(),
        nested(),
        vars(),
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009',
        }),];
    //   appConfig.module.rules[4].use = ExtractTextPlugin.extract({
    //   fallback: require.resolve('style-loader'),
    //   use: [
    //     {
    //       loader: require.resolve('css-loader'),
    //       options: {
    //         importLoaders: 1,
    //         minimize: !dev,
    //       },
    //     },
    //     'url-loader',
    //     'postcss-loader',
    //   ],
    // });
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
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009',
        }),
      ];
    // fs.appendFile("e:\\web\\foo.js", "\n\n\n===========\n" + util.inspect(appConfig, {showHidden: false, depth: null,showProxy: true}), () => {});
    return appConfig;
  }
}
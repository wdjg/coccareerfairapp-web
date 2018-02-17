const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const razzleHeroku = require('razzle-heroku');
// const util = require('util')
// var fs = require('fs');
// var log_file = fs.createWriteStream('e:/foo.js', {flags : 'w'});
// var log_stdout = process.stdout;


module.exports = {
  modify: (config, {target, dev}, webpack) => {
    // if (config.module.rules[4].use[2])
    //   log_file.write(config.module.rules[4].use[2].options.plugins, {showHidden: false, depth: null,showProxy: true}));
    const appConfig = razzleHeroku(config, {target, dev}, webpack);

    if (config.module.rules[4].use[2])
      appConfig.module.rules[4].use[2].options.plugins = () => [
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
        nested(),
      ];
    return appConfig;
  }
}
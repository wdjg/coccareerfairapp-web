module.exports =  {
  plugins: [
  	require('postcss-import')(),
    require('postcss-nested')(),
    require('postcss-simple-vars')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer'),
  ]
};
{ context: 'E:\\web\\coccareerfairapp-web',
  target: 'web',
  devtool: 'cheap-module-source-map',
  resolve: 
   { modules: 
      [ 'node_modules',
        'E:\\web\\coccareerfairapp-web\\node_modules' ],
     extensions: [ '.js', '.json', '.jsx' ],
     alias: 
      { 'webpack/hot/poll': 'E:\\web\\coccareerfairapp-web\\node_modules\\webpack\\hot\\poll.js',
        'react-native': 'react-native-web' } },
  resolveLoader: 
   { modules: 
      [ 'E:\\web\\coccareerfairapp-web\\node_modules',
        'E:\\web\\coccareerfairapp-web\\node_modules\\razzle\\node_modules' ] },
  module: 
   { strictExportPresence: true,
     rules: 
      [ { test: /\.(js|jsx)$/,
          enforce: 'pre',
          use: 
           [ { options: 
                { formatter: [Function: formatter],
                  eslintPath: 'E:\\web\\coccareerfairapp-web\\node_modules\\eslint\\lib\\api.js',
                  ignore: false,
                  useEslintrc: false,
                  baseConfig: 
                   { extends: 
                      [ 'E:\\web\\coccareerfairapp-web\\node_modules\\eslint-config-react-app\\index.js' ] } },
               loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\eslint-loader\\index.js' } ],
          include: 'E:\\web\\coccareerfairapp-web\\src' },
        { test: /\.(js|jsx)$/,
          loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\razzle\\node_modules\\babel-loader\\lib\\index.js',
          include: [ 'E:\\web\\coccareerfairapp-web\\src' ],
          options: 
           { babelrc: true,
             cacheDirectory: true,
             presets: 
              [ 'E:\\web\\coccareerfairapp-web\\node_modules\\razzle\\babel.js' ] } },
        { exclude: 
           [ /\.html$/,
             /\.(js|jsx)$/,
             /\.(ts|tsx)$/,
             /\.(vue)$/,
             /\.(less)$/,
             /\.(re)$/,
             /\.(s?css|sass)$/,
             /\.json$/,
             /\.bmp$/,
             /\.gif$/,
             /\.jpe?g$/,
             /\.png$/ ],
          loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\file-loader\\index.js',
          options: { name: 'static/media/[name].[hash:8].[ext]' } },
        { test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
          loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\url-loader\\index.js',
          options: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]' } },
        { test: /\.css$/,
          exclude: [ 'E:\\web\\coccareerfairapp-web\\build' ],
          use: 
           [ { loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js',
               options: { omit: 1, remove: true } },
             { loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\style-loader\\index.js' },
             { loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\css-loader\\index.js',
               options: { importLoaders: 1, minimize: false } },
             { loader: 'postcss-loader' } ] } ] },
  plugins: 
   [ NamedModulesPlugin { options: {} },
     AssetsWebpackPlugin {
       options: 
        { path: 'E:\\web\\coccareerfairapp-web\\build',
          filename: 'assets.json',
          prettyPrint: false,
          update: false,
          fullPath: true,
          processOutput: [Function] },
       writer: [Function: queuedWriter] },
     HotModuleReplacementPlugin {
       options: {},
       multiStep: undefined,
       fullBuildTimeout: 200,
       requestTimeout: 10000 },
     NoEmitOnErrorsPlugin {},
     DefinePlugin {
       definitions: 
        { 'process.env': 
           { NODE_ENV: '"development"',
             PORT: '3000',
             VERBOSE: 'false',
             HOST: '"localhost"',
             RAZZLE_ASSETS_MANIFEST: '"E:\\\\web\\\\coccareerfairapp-web\\\\build\\\\assets.json"',
             BUILD_TARGET: '"client"',
             PUBLIC_PATH: '"/"',
             RAZZLE_PUBLIC_DIR: '"E:\\\\web\\\\coccareerfairapp-web\\\\public"' } } },
     WebpackErrorsPlugin {
       verbose: false,
       onSuccessMessage: 'Your application is running at http://localhost:3000',
       target: 'CLIENT' } ],
  entry: 
   { client: 
      [ 'E:\\web\\coccareerfairapp-web\\node_modules\\razzle-dev-utils\\webpackHotDevClient.js',
        'E:\\web\\coccareerfairapp-web\\src\\client' ] },
  output: 
   { path: 'E:\\web\\coccareerfairapp-web\\build\\public',
     publicPath: 'http://localhost:3001/',
     pathinfo: true,
     filename: 'static/js/bundle.js',
     chunkFilename: 'static/js/[name].chunk.js',
     devtoolModuleFilenameTemplate: [Function: devtoolModuleFilenameTemplate] },
  devServer: 
   { disableHostCheck: true,
     clientLogLevel: 'none',
     compress: true,
     headers: { 'Access-Control-Allow-Origin': '*' },
     historyApiFallback: { disableDotRule: true },
     host: 'localhost',
     hot: true,
     noInfo: true,
     overlay: false,
     port: 3001,
     quiet: true,
     watchOptions: { ignored: /node_modules/ },
     setup: [Function: setup] } }{ context: 'E:\\web\\coccareerfairapp-web',
  target: 'node',
  devtool: 'cheap-module-source-map',
  resolve: 
   { modules: 
      [ 'node_modules',
        'E:\\web\\coccareerfairapp-web\\node_modules' ],
     extensions: [ '.js', '.json', '.jsx' ],
     alias: 
      { 'webpack/hot/poll': 'E:\\web\\coccareerfairapp-web\\node_modules\\webpack\\hot\\poll.js',
        'react-native': 'react-native-web' } },
  resolveLoader: 
   { modules: 
      [ 'E:\\web\\coccareerfairapp-web\\node_modules',
        'E:\\web\\coccareerfairapp-web\\node_modules\\razzle\\node_modules' ] },
  module: 
   { strictExportPresence: true,
     rules: 
      [ { test: /\.(js|jsx)$/,
          enforce: 'pre',
          use: 
           [ { options: 
                { formatter: [Function: formatter],
                  eslintPath: 'E:\\web\\coccareerfairapp-web\\node_modules\\eslint\\lib\\api.js',
                  ignore: false,
                  useEslintrc: false,
                  baseConfig: 
                   { extends: 
                      [ 'E:\\web\\coccareerfairapp-web\\node_modules\\eslint-config-react-app\\index.js' ] } },
               loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\eslint-loader\\index.js' } ],
          include: 'E:\\web\\coccareerfairapp-web\\src' },
        { test: /\.(js|jsx)$/,
          loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\razzle\\node_modules\\babel-loader\\lib\\index.js',
          include: [ 'E:\\web\\coccareerfairapp-web\\src' ],
          options: 
           { babelrc: true,
             cacheDirectory: true,
             presets: 
              [ 'E:\\web\\coccareerfairapp-web\\node_modules\\razzle\\babel.js' ] } },
        { exclude: 
           [ /\.html$/,
             /\.(js|jsx)$/,
             /\.(ts|tsx)$/,
             /\.(vue)$/,
             /\.(less)$/,
             /\.(re)$/,
             /\.(s?css|sass)$/,
             /\.json$/,
             /\.bmp$/,
             /\.gif$/,
             /\.jpe?g$/,
             /\.png$/ ],
          loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\file-loader\\index.js',
          options: { name: 'static/media/[name].[hash:8].[ext]' } },
        { test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
          loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\url-loader\\index.js',
          options: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]' } },
        { test: /\.css$/,
          exclude: [ 'E:\\web\\coccareerfairapp-web\\build' ],
          use: 
           [ { loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js',
               options: { omit: 1, remove: true } },
             { loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\style-loader\\index.js' },
             { loader: 'E:\\web\\coccareerfairapp-web\\node_modules\\css-loader\\index.js',
               options: { importLoaders: 1, minimize: false } },
             { loader: 'postcss-loader' } ] } ] },
  node: { console: true, __filename: true, __dirname: true },
  externals: [ [Function] ],
  output: 
   { path: 'E:\\web\\coccareerfairapp-web\\build',
     publicPath: 'http://localhost:3001/',
     filename: 'server.js' },
  plugins: 
   [ NamedModulesPlugin { options: {} },
     DefinePlugin {
       definitions: 
        { 'process.env': 
           { NODE_ENV: '"development"',
             PORT: '3000',
             VERBOSE: 'false',
             HOST: '"localhost"',
             RAZZLE_ASSETS_MANIFEST: '"E:\\\\web\\\\coccareerfairapp-web\\\\build\\\\assets.json"',
             BUILD_TARGET: '"server"',
             PUBLIC_PATH: '"/"',
             RAZZLE_PUBLIC_DIR: '"E:\\\\web\\\\coccareerfairapp-web\\\\public"' } } },
     LimitChunkCountPlugin { options: { maxChunks: 1 } },
     HotModuleReplacementPlugin {
       options: {},
       multiStep: undefined,
       fullBuildTimeout: 200,
       requestTimeout: 10000 },
     NoEmitOnErrorsPlugin {},
     StartServerPlugin {
       options: { name: 'server.js', nodeArgs: [] },
       afterEmit: [Function: bound afterEmit],
       apply: [Function: bound apply],
       startServer: [Function: bound startServer],
       worker: null },
     WatchIgnorePlugin {
       paths: [ 'E:\\web\\coccareerfairapp-web\\build\\assets.json' ] },
     WebpackErrorsPlugin {
       verbose: false,
       onSuccessMessage: 'Your application is running at http://localhost:3000',
       target: 'SERVER' } ],
  entry: [ 'webpack/hot/poll?300', 'E:\\web\\coccareerfairapp-web\\src' ],
  watch: true }
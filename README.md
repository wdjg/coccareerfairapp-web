# Jacket - Front End

This is the front end repository for Jacket, a career fair information and virtual line system for Georgia Tech's College of Computing.


## Quick Start

1. Install the latest [Node.js](https://nodejs.org/en/)
2. Update npm via the terminal `npm i -g npm` (may need to run with sudo, i.e. `sudo npm i -g npm`)
3. Install [Yarn](https://yarnpkg.com/en/)
4. Then you can start

```bash
git clone https://github.com/wdjg/coccareerfairapp-web.git 
cd coccareerfairapp-web
yarn install
yarn dev
```

Then open http://localhost:3000/ to see your app. Your console should look like this:

Below is a list of commands you will probably find useful.

### `yarn dev` 

Runs the project in development mode.   
You can view your application at `http://localhost:3000`

The page will reload if you make edits.

### `yarn build`
Builds the app for production to the build folder.      

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

### `npm start -- --inspect` or `yarn start -- --inspect`

To debug the node server, you can use `razzle start --inspect`. This will start the node server and enable the inspector agent. For more information, see [this](https://nodejs.org/en/docs/inspector/).
# Jacket - Front-End

This is the front end repository for Jacket, a career fair information and virtual line system for Georgia Tech's College of Computing. 

This repository only includes the front-end portion of this project, which consists of the React app and web assets. The back-end portion of this project can be found [here](https://github.com/wdjg/coccareerfairapp-server).

This project was built with node v8.9.4 and npm v5.8.0.

This app is currently deployed on heroku on these free tier boxes:

```
jacket-web-development.herokuapp.com // web development box
jacket-server-development.herokuapp.com // server development box

jacket-app.herokuapp.com // web production box
jacket-server-production.herokuapp.com // server production box
If you need access to this Repository, Heroku, Zenhub, or other documents, please see the contact information below.
```

## Release Notes

Version 1.0

April 23rd, 2018

### New Features

1. Company Search Screen
2. Company Profile Screen
3. Built-In QR Scanner for Students
4. Recruiter Buffer Line Screen
5. Interview Screen for Recruiters
6. Line information and statistics
7. Frequently Asked Questions Screen


### Known Bugs

1. The way that the responsive state is calculated (i.e. whether or not you’re using a small screen), is such that if you rotate the screen on your phone, it’ll show the desktop version; the desktop version does not work well on phones
2. Certain authentication wrappers made using redux-auth-wrapper are supposed to redirect users back to the page they came from, but they all just go to the main page; they do this because I coded a fallback, but there seems to be some issue with the auth wrappers reading the redux location history.
3. The client side of the front end apparently can’t read environment variables, so we have to set things like API urls manually
4. The previous bug matters because currently the front end is using the development backend for its API calls, not the production one (they’re functionally the same, but it just seems wrong)
5. At certain zoom levels of the mobile the “Interview Time” header runs over the the divider line
6. On certain browsers, the login auto-complete box doesn’t move when the warning pops up obscuring the login input
7. Some API calls don’t have catch blocks, so they display errors in the console; luckily Javascript is a chill dude and doesn’t worry much about it, but these should probably be handled
8. Also, most API error handling is just a console log statement rather than anything actually helpful, so either remove the logs if a an API rejection is useless or actually handle the error on the front end
9. The “X” button on the scanner is awkward to reach with the url bar showing in phone browsers, and sometimes jerks up and down
10. There are inconsistencies with how mobile browsers hidr their url bar which makes the app visually less pleasing and sometimes harder to use
11. Many @media queries in the css are incongruous, so there’s bound to be style issues with weirdly-sized screens 
12. There are several screens that technically function, but not that well, and also look terrible (e.g. profile screens); they probably have loads of bugs, but they’re WIP, so do with them as you will
13. The back-end can allow users to be in multiple lines, but the font-end doesn’t currently; the hack that fixes this is probably bad enough to call it a bug

## Installation

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

<img src="https://cloud.githubusercontent.com/assets/4060187/26324663/b31788c4-3f01-11e7-8e6f-ffa48533af54.png" width="500px" alt="Razzle Development Mode"/>

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

#Contact

John Britti: <jbritti3@gatech.ed>
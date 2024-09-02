# WTWR (What to Wear?)

## About the project

In this sprint, you'll continue working on the “WTWR” web application. Your goal for this iteration is to continue implementing functionality using the React features you've just learned. You will implement the following:

- A temperature unit toggle switch using React context

- A profile page route using React Router

- Form submission using controlled components or refs

- You'll also set up a mock server and write some code to make API calls to it. This mock server will mimic the behavior of the back end that you'll start building in Sprint 12.

## Added Features

- added versioning in console (read from package.json)
- added feature pull browser info for long and latitude use through project for location and temp

## TODO

- add modal for long, lat input
- set default long, lat for project

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

### Component Structure

The project includes a components directory with the following components:

```
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── se_project_react.code-workspace
└── src
    ├── components
    ├── images
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
    ├── setupTests.js
    ├── utils
    └── vendor
```

## software to install

- nvm
- npm

## Software Installation and Run React App

### Install nvm plugin

- nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash`

### Add Reference to terminal - add to .bashrc, .zshrc etc

open a terminal and copy below and paste the following

```
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

open a new terminal || type `source ~/.bashrc || ~/.zshrc .. etc`

### Install npm with nvm plugin

- open a new terminal

- type : `nvm install npm`

### Have nvm install correct version of node

- type : `cd <root directory> && nvm use`

check installed nvm version

- type : `nvm -ls`

### If nvm version not installed

- type : `nvm install <node version>`

then

- type : `nvm use`

### Install project packages

- type : `npm i || npm install`

## Run Commands

`npm run nvmSelect` - Selects nvm version and runs

`npm run build` - Build Production (Vite + React)

`npm run clean` - Removes build artifacts '/node_modules' && '/build'

`npm run start` - starts React App Interface

Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## Updates

### 2024 09 02

    - updates & refactor killed dead code
    - added json server to test build locally
    = added json db - to fullfill req
    - final markup before submission

### 2024 08 21

### 2024 08 23

    - AddItemModal

### 2024 08 10

    - npm update
    - eslissue
    - nvm update
    - dependencies/packages updates
    - "nvm install v20.16.0"
    - README.MD Updates
    - update toggle switch

### 2024 08 18

    - updated code to use global logger
    - cleaned up old comments
    - reverted code to get headers working and not adding errant code
    - started over -- From begining

### 2024 08 18

    - implement temp switch
    - implment context

### Github

    - https://github.com/zimmermanjosh/se_project_react_WTWR_part2

### LocalDir

    - /Users/jozimmerman/Dev/se_project_react_WTWR_part2

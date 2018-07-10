# Job Application with translation feature

Social Web app for connecting people via events built by React, Redux and Firebase


[Demo verson. Click here!](https://reevent-207107.firebaseapp.com/)


## Quick Overview.


```sh
npm install

npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

<img src="https://media.giphy.com/media/3izafK3cFzUh68JArq/giphy.gif" width='600' alt='npm start' />

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    assets/
    public/
    index.html
    manifest.json
    favicon.ico
  src/
    app/
      common/
        data/
        form/
        util/
      config/
        firebase.js
      layout/
        App.css
        App.jsx
        loader.css
        LoaderManual.jsx
        LoaderComp.jsx
        logo.svg
      reducers/
        rootReducer.js
      store
        configureStore.js
    features/
      async/
      auth/
      event/
      home/
      modals/
      nav/
      user/
      index.css
      index.js
    .eslintrc.json
    .firebaserc
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Installing



```
npm install
```
or

```
yarn
```

then it will install all required modules needed to run.

## Running the application


```
npm start
```

```
yarn start
```

It automatically deploys the app and show it in the browser as [http://localhost:3000/](http://localhost:3000/)


## Built With

* [React](https://reactjs.org/) - The web library used
* [Create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) - Building flatform
* [firestore](https://firebase.google.com/docs/firestore/) - Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform
* [Flow](https://flow.org/) -  Static Type Checker
* [Redux](https://redux.js.org/) - State management
* [Redux-form](https://redux-form.com/7.2.3/) - State management for form


## Authors

* **Anh Hoang Vo** - *Initial work* - [Sign Up Form](https://github.com/anhvo28/job-application-react)

See also the list of [contributors](https://github.com/anhvo28/job-application-react/contributors) who participated in this project.
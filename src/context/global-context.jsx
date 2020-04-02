import React from 'react';

import * as firebase from "firebase/app";
import "firebase/firestore";

import config from '../firebase-config';


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const defaultValue = {
  db: firebase.firestore()
}

const GlobalStore = React.createContext({
  db: firebase.firestore()
});

export default GlobalStore;

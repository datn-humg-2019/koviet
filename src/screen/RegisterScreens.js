
import React, { Component } from 'react'
import {
  Navigation
} from "react-native-navigation";

import _ from 'lodash'
import * as screenRegister from './'
import stores from '../store/'
import Provider from '../utils/MobxRnnProvider'

const addStore = (Component, ...props) => {
  return class App extends React.Component {
    render() {
      return (
        <Provider store={stores}>
          <Component {...{
            ...this.props,
            ...props,
          }} />
        </Provider>
      );
    }
  }
};

export function registerScreens() {
  _.map(screenRegister, (v, k) => {
    Navigation.registerComponent(`${k}`, () => addStore(v))
  })
}
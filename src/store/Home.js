import React, { Component } from "react";
import {
    AsyncStorage,
} from "react-native";
import { observable, action } from "mobx";
import {
    config,
    values,
    api,
} from "../config";
import _ from 'lodash'
import moment from 'moment'
import { GetNoToken } from "../config/request";

class Home {
    @observable token = '';
    
    @action
    getUserInfo() {
        console.log(JSON.stringify(this.userInfo))
    }

   
}

export default new Home();

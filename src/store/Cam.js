import React, { Component } from "react";
import {
    AsyncStorage,
} from "react-native";
import { observable, action, toJS } from "mobx";
import {
    config,
    values,
    api,
} from "../config";
import _ from 'lodash'
import moment from 'moment'

class Cam {
    @observable isFront = false;
    @observable isFlash = false;

    @action
    changeTypeCamera() {
        this.isFront = !this.isFront;
    }

    @action
    changeTypeFlash() {
        this.isFlash = !this.isFlash;
    }



}

export default new Cam();

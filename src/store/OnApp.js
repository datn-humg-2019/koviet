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

const themApp = {
    light: { id: 0, backgroundColor: '#EAEAEA', colorText: '#000000', borderColor: '#EFEFEF' },
    dark: { id: 0, backgroundColor: "#303030", colorText: '#fff', borderColor: '#3C3C3C' }
}
class OnApp {
    @observable isConnect = true;
    @observable isShowScanQR = true;
    @observable themCurrent = themApp.light
    @action setDataNoti(dataNoti) {
        this.dataNoti = dataNoti
        console.log("setDataNoti", dataNoti)
    }

    @action
    hiddenScanQR() {
        this.isShowScanQR = false;
        AsyncStorage.setItem('isShowScanQR', 'false')
    }

    @action
    showScanQR() {
        this.isShowScanQR = true;
        AsyncStorage.setItem('isShowScanQR', 'true')
    }
}

export default new OnApp();

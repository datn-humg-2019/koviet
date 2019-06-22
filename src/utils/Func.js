import React, { Component } from "react";
import {
  ImageBackground,
  View,
  StatusBar,
  Image,
  Alert,
  Platform,
  Linking
} from "react-native";
import _ from "lodash";
import numeral from "numeral";
import Permissions from "react-native-permissions";
import SimpleToast from "react-native-simple-toast";
import { values, api_key_google, config, status_api_google } from "../config";

import AndroidOpenSettings from "react-native-android-open-settings";

import { GetNoToken, GetWithToken } from "../config/request";

export const clog = (message, data) => {
  console.log(`${message}: ` + JSON.stringify(data));
};

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  if (re.test(String(email).toLowerCase())) {
    return true;
  } else {
    return false;
  }
}

export function convertToPrice(string) {
  return `${numeral(string + "").format(0, 0)} đ`;
}

export function updateNav() {
  // Navigation.mergeOptions('MainScreen', {
  //     topBar: {
  //         visible: true,
  //         title: {
  //             text: title
  //         }
  //     }
  // })
}

export function bodauTiengViet(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

export function checkPhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  console.log("phone: " + phone);
  console.log("phone.lenght: " + phone.length);
  console.log("re.test(phone): " + re.test(phone));
  if ((phone + "").length === 10) {
    return re.test(phone);
  } else {
    return false;
  }
}

export function _alertForBluetoothPermission() {
  Alert.alert("Cảnh báo", "Thiết bị cần được kích hoạt Bluetooth?", [
    {
      text: "Từ chối",
      onPress: () => console.log("Permission denied"),
      style: "cancel"
    },
    {
      text: "Open Settings",
      onPress: () => {
        if (values.platform == "android") {
          // Open bluetooth settings menu
          AndroidOpenSettings.bluetoothSettings();
        } else {
          Linking.openURL("app-settings:");
        }
      }
    } //vao setting xin quyen
  ]);
}

export function _alertForPhotosAndCameraPermission(title, messeage) {
  if (values.platform === "ios") {
    Alert.alert(title, messeage, [
      {
        // text: 'No way',
        text: "Từ chối",
        onPress: () => console.log("Permission denied"),
        style: "cancel"
      },
      {
        text: "Mở Cài Đặt",
        //  text: 'Open Settings',
        onPress: Permissions.openSettings
      } //vao setting xin quyen
    ]);
  } else {
    SimpleToast.show(
      "Ứng dụng chưa được cấp quyền truy cập vào thiết bị của bạn !"
    );
  }
}

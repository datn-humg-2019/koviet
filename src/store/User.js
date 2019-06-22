import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";
import { observable, action } from "mobx";
import { config, values, api } from "../config";
import { get } from "lodash";
import moment from "moment";
import { PostNoToken, PostWithToken } from "../config/request";
import SimpleToast from "react-native-simple-toast";
import { goAuth } from "../../App";

class User {
  @observable token = "";
  @observable isLoading = false;

  @observable userInfo = {
    fullName: "Tran Xuan Ai",
    position: "ADMIN",
    avatar: "http://i.ytimg.com/vi/-Iha_M9fRY4/hqdefault.jpg"
  };
  @observable isTheFirst = false;

  @observable rootNavigator = null;

  @action
  loading() {
    this.isLoading = true;
  }

  @action
  noLoad() {
    this.isLoading = false;
  }

  @action
  getUserInfoData() {
    this.userInfo = {
      fullName: "Tran Xuan Ai",
      position: "ADMIN",
      avatar: "http://i.ytimg.com/vi/-Iha_M9fRY4/hqdefault.jpg"
    };
  }
  @action
  setUserInfo(data) {
    this.userInfo = data;
  }

  @action
  login(body, callback = null) {
    PostNoToken(api.AUTH.login, body, (data, status) => {
      if (status) {
        if (get(data, "code") == 0) {
          AsyncStorage.setItem("token", get(data, "data.loginToken"));
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối LG61");
      }
    });
  }

  @action
  getUserInfo(callback = null) {
    PostWithToken(api.AUTH.userInfo, {}, (data, status) => {
      console.log("data: ", data);
      if (status) {
        if (get(data, "code") == 0) {
          this.setUserInfo(get(data, "data"));
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối GUI80");
      }
    });
  }

  @action
  registregisterAccounterAccount(json, callback = null) {
    PostNoToken(api.AUTH.signup, json, (data, status) => {
      console.log("data register: " + JSON.stringify(data));
      if (status) {
        if (get(data, "code") == 0) {
          SimpleToast.show("Đăng kí thành công. Vui lòng đăng nhập lại");
          callback && callback(true);
        } else {
          callback && callback(false);
          SimpleToast.show(data.message);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối RA86");
      }
    });
  }

  @action
  updateUserInfo(json, callback = null) {
    PostWithWSCode(
      api.ACCOUNT.updateUserInfo,
      "updateUserInfo",
      json,
      (status, data) => {
        console.log("updateUserInfo: " + JSON.stringify(data));
        if (status) {
          if (data) {
            if (data.errorCode == 0) {
              if (data.data) {
                this.token = data.data.token || "";
                callback && callback(true);
                SimpleToast.show(data.message);
              } else {
                callback && callback(false);
              }
            } else {
              callback && callback(false);
              SimpleToast.show(data.message);
            }
          } else {
            callback && callback(false);
          }
        } else {
          callback && callback(false);
          SimpleToast.show("Lỗi kết nối UUI150");
        }
      }
    );
  }

  @action
  forgotPassword(value, callback = null) {
    PostNoToken(api.AUTH.forgetPass, { email: value }, (status, data) => {
      if (status) {
        if (data) {
          if (data.errorCode == 0) {
            callback && callback(true);
            SimpleToast.show(data.message);
            // this.token = data.responseBase.token;
          } else {
            callback && callback(false);
            SimpleToast.show(data.message);
          }
        } else {
          callback && callback(false);
        }
      } else {
        callback && callback(false);
        SimpleToast.show("Lỗi kết nối FP174");
      }
    });
  }
  @action
  removeKey() {
    let key = ["token"];
    AsyncStorage.multiRemove(key);
  }

  @action
  logout() {
    this.removeKey();
    goAuth();
  }
}

export default new User();

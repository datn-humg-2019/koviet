import React, { Component } from "react";
import { Text, View, Image, AsyncStorage } from "react-native";

import { goHome, goAuth, goApp2 } from "../../../App";
console.disableYellowBox = true;
import styles from "./StyleSheet";
import { inject, observer } from "mobx-react";
import { images, values, color, fonts } from "../../config";
@inject("User", "OnApp")
@observer
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let { User } = this.props;
    setTimeout(() => {
      AsyncStorage.getItem("token").then(token => {
        if (token) {
          User.getUserInfo(statusGetUser => {
            if (statusGetUser) {
              goHome();
            } else {
              goAuth();
            }
          });
        } else {
          goAuth();
        }
      });
    }, 1500);
  }

  render() {
    let { OnApp } = this.props;
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: color.mainColor,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 70,
            fontWeight: "bold",
            fontFamily: fonts.svn_inter,
            color: '#fff'
          }}
        >
          {"KoViet"}
        </Text>
        {!OnApp.isConnect ? (
          <Text style={StyleSheet.textDisconnect}>
            Đường truyền mạng trên thiết bị đã mất kết nối. Vui lòng kiểm tra và
            thử lại!
          </Text>
        ) : null}
      </View>
    );
  }
}

import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { noop } from "lodash";
import { fonts, color, values, images } from "../../config";
import ButtonGradient from "../../component/ButtonGradient";
import LoginScreen from "./login/index";
import RegisterScreen from "./register/";
import { Navigation } from "react-native-navigation";

const type = { login: 0, register: 1 };

import { goHome } from "../../../App";
import AppComponent from "../../component/AppComponent";
import { inject, observer } from "mobx-react";
@inject("User", "OnApp")
@observer
export default class AuthScreen extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      type: type.login
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    // will be called when "buttonOne" is clicked
  }

  changeType = typeNow => {
    if (typeNow == type.login) {
      this.setState({ type: type.login });
    } else {
      this.setState({ type: type.register });
    }
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  clickFogotPass = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              id: "FogotPasswordScreen",
              name: "FogotPasswordScreen",
              passProps: {
                text: "stack with one child"
              },
              options: {
                topBar: {
                  leftButtons: [
                    {
                      id: "close",
                      color: "#000",
                      icon: images.ic_close
                    }
                  ],
                  // title: {
                  //     text: 'List Favorite',
                  //     color: '#fff',
                  //     fontSize: values.nav.fontSize
                  // },
                  rightButtons: [],
                  noBorder: true,
                  animate: true,
                  borderColor: "transparent", //android
                  // visible: false,
                  // drawBehind: true,
                  // transparent: true,
                  // translucent: true,
                  background: { color: "#fff" }
                  // elevation: 0,
                }
              }
            }
          }
        ]
      }
    });
  };

  clickRegister = json => {
    let { User } = this.props;
    Keyboard.dismiss();
    this.loading();
    User.registerAccount(json, status => {
      if (status) {
        this.setState({ type: type.login });
      }
      this.noLoad();
    });
  };

  loading = () => {
    this.setState({ isLoading: true });
  };

  noLoad = () => {
    this.setState({ isLoading: false });
  };

  renderContent() {
    let { User } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ width: "100%", flex: 1 }}
        onPress={this.dismissKeyboard}
      >
        <ScrollView style={{ height: "100%", width: "100%" }}>
          <KeyboardAvoidingView
            behavior="padding"
            enabled={values.platform == "ios" ? true : false}
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "#fff",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: 58,
                fontWeight: "bold",
                marginBottom: 20,
                marginTop: values.isTablet
                  ? values.marginTopScreen + 120
                  : values.marginTopScreen + 20,
                fontFamily: fonts.svn_inter,
                color: color.mainColor
              }}
            >
              {"KOViet"}
            </Text>
            <View
              style={{
                backgroundColor: "transparent",
                paddingVertical: 20,
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                onPress={() => this.changeType(type.login)}
                style={{ borderRightColor: "#70707030", borderRightWidth: 0.5 }}
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 20,
                    // fontFamily: fonts.sf_ui_menium,
                    color:
                      this.state.type == type.login
                        ? color.mainColor
                        : color.colorText_nolected
                  }}
                >
                  Đăng nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.changeType(type.register)}
                style={{}}
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 20,
                    color:
                      this.state.type == type.register
                        ? color.mainColor
                        : color.colorText_nolected
                  }}
                >
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "80%" }}>
              {this.state.type == type.login ? (
                <LoginScreen
                  clickFogotPass={this.clickFogotPass}
                  showLoading={this.showLoading}
                  hideLoading={this.hideLoading}
                />
              ) : (
                <RegisterScreen clickRegister={this.clickRegister} />
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableOpacity>
    );
  }
}

import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard
} from "react-native";
import { noop } from "lodash";
import ButtonGradient from "../../../component/ButtonGradient";
import { color, values, images } from "../../../config";
import SimpleToast from "react-native-simple-toast";
import { validateEmail } from "../../../utils/Func";
import { goHome } from "../../../../App";
import { inject, observer } from "mobx-react";

type PropsType = {
  showLoading?: Function,
  hideLoading?: Function
};
@inject("User")
@observer
export default class LoginScreen extends React.Component<PropsType> {
  static defaultProps = {
    showLoading: noop,
    hideLoading: noop
  };

  constructor(props: PropsType): void {
    super(props);

    this.state = {
      // email: "aitranxuan.dev@gmail.com",
      email: "",
      password: "",
      // email: "tuanbacyen@gmail.com",
      // password: "123456",
      isShowPass: false
    };
  }

  // checkValue = () => {
  //   let check = false;
  //   if (this.state.email.trim() != '') {
  //     if (validateEmail(this.state.email)) {
  //       if (this.state.password.trim() != '') {
  //         check = true
  //         // if (this.state.password.trim().length > 6) {

  //         // } else {
  //         //   SimpleToast.show('Mật khẩu cần phải lớn hơn 6 kí tự')
  //         // }
  //       } else {
  //         SimpleToast.show('Bạn cần nhập mật khẩu')
  //       }
  //     } else {
  //       SimpleToast.show('Bạn cần nhập đúng định dạng email')
  //     }
  //   } else {
  //     SimpleToast.show('Bạn cần nhập email')
  //   }
  //   return check
  // }

  checkValue = () => {
    let { email, password } = this.state;

    let check = false;
    if (email.trim() != "") {
      if (validateEmail(email)) {
        if (password.trim() != "") {
          check = true;
        } else {
          SimpleToast.show("Bạn cần nhập mật khẩu");
        }
      } else {
        SimpleToast.show("Bạn cần nhập đúng định dạng email");
      }
    } else {
      SimpleToast.show("Bạn cần nhập email");
    }
    return check;
  };

  handelClickLogin = () => {
    let { email, password } = this.state;
    let { User, showLoading, hideLoading } = this.props;
    Keyboard.dismiss();
    if (this.checkValue()) {
      showLoading();
      User.login({ email, password }, status => {
        if (status) {
          User.getUserInfo(statusGetUser => {
            hideLoading();
            if (statusGetUser) {
              goHome();
            }
          });
        } else {
          hideLoading();
        }
      });
    }
  };

  render() {
    let { clickFogotPass } = this.props;
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            borderRadius: 10,
            width: "100%",
            borderColor: "#D6D6D6",
            borderWidth: 1,
            overflow: "hidden"
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 1
            }}
          >
            {/* <TextInput
              underlineColorAndroid={'transparent'}
              placeholder='Email'
              placeholderTextColor={color.colorText_nolected}
              keyboardType='email-address'
              style={{
                color: color.mainColor, height: 40,
                fontSize: values.fontSizeTitle, flex: 1,
                textAlign: 'center',
              }}
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />
            {
              this.state.email.trim() != ''
                ?
                <TouchableOpacity onPress={() => this.setState({ email: '' })} style={{ width: 25, height: 40, alignItems: 'center', justifyContent: 'center', }}>
                  <Image style={{ width: 15, resizeMode: 'contain' }}
                    source={images.ic_clear} />
                </TouchableOpacity>
                :
                null
            } */}
            <TextInput
              underlineColorAndroid={"transparent"}
              placeholder="Email"
              placeholderTextColor={color.colorText_nolected}
              keyboardType='email-address'
              style={{
                color: color.mainColor,
                height: 40,
                fontSize: values.fontSizeTitle,
                flex: 1,
                textAlign: "center"
              }}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            {this.state.email.trim() != "" ? (
              <TouchableOpacity
                onPress={() => this.setState({ email: "" })}
                style={{
                  width: 25,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 15, resizeMode: "contain" }}
                  source={images.ic_clear}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <TextInput
              underlineColorAndroid={"transparent"}
              placeholder="Mật khẩu"
              secureTextEntry={!this.state.isShowPass}
              placeholderTextColor={color.colorText_nolected}
              style={{
                color: "#000",
                height: 40,
                fontSize: values.fontSizeTitle,
                textAlign: "center",
                flex: 1
              }}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            {this.state.password.trim() != "" ? (
              <TouchableOpacity
                onPress={() =>
                  this.setState({ isShowPass: !this.state.isShowPass })
                }
                style={{
                  width: 25,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: 15, resizeMode: "contain" }}
                  source={
                    this.state.password.trim() == ""
                      ? images.ic_hide_pass
                      : images.ic_show_pass
                  }
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <TouchableOpacity onPress={clickFogotPass} style={{}}>
          <Text
            style={{
              fontSize: values.fontSizeNormal,
              color: "black",
              paddingHorizontal: 20,
              paddingVertical: 15,
              textAlign: "center"
            }}
          >
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>

        <ButtonGradient
          onPress={this.handelClickLogin}
          containStyle={{ width: "80%" }}
          title={"Đăng nhập"}
        />
      </View>
    );
  }
}

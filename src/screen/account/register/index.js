import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard
} from "react-native";
import ButtonGradient from "../../../component/ButtonGradient";
import { color, values, images } from "../../../config";
import { validateEmail, checkPhone } from "../../../utils/Func";
import SimpleToast from "react-native-simple-toast";
import CheckBoxView from "../../../component/CheckBoxView";

type PropsType = { clickRegister: Function };
export default class RegisterScreen extends React.PureComponent<PropsType> {
  constructor(props) {
    super(props);

    this.state = {
      isUnderstand: false,
      email: "",
      phone: "",
      password: "",
      repassword: "",
      name: ""
    };
  }

  chooseUnderstand = () => {
    this.setState({ isUnderstand: !this.state.isUnderstand });
  };

  checkValue = () => {
    const { email, name, repassword, password, phone } = this.state;
    let check = false;
    if (email.trim() != "") {
      if (validateEmail(email)) {
        if (phone.trim() != "") {
          if (checkPhone(phone)) {
            if (password.trim() != "") {
              if (password.trim().length >= 6) {
                if (repassword.trim() != "") {
                  if (repassword === password) {
                    if (name.trim() != "") {
                      check = true;
                    } else {
                      SimpleToast.show("Bạn cần nhập tên công ty");
                    }
                  } else {
                    SimpleToast.show("Mật khẩu nhập lại không trùng khớp");
                  }
                } else {
                  SimpleToast.show("Bạn cần xác nhận lại mật khẩu");
                }
              } else {
                SimpleToast.show("Mật khẩu cần phải lớn hơn bằng 6 kí tự");
              }
            } else {
              SimpleToast.show("Bạn cần nhập mật khẩu");
            }
          } else {
            SimpleToast.show("Bạn cần nhập đúng định dạng số điện thoại");
          }
        } else {
          SimpleToast.show("Bạn cần nhập số điện thoại");
        }
      } else {
        SimpleToast.show("Bạn cần nhập đúng định dạng email");
      }
    } else {
      SimpleToast.show("Bạn cần nhập email");
    }
    return check;
  };

  clickRegister = () => {
    Keyboard.dismiss();
    const { email, name, password, phone, isUnderstand } = this.state;
    if (this.checkValue()) {
      if (isUnderstand) {
        this.props.clickRegister({
          "user[email]": email,
          "user[phone]": phone,
          "user[password]": password,
          "user[name]": name
        });
      } else {
        SimpleToast.show("Bạn cần chấp nhận điều khoản dịch vụ");
      }
    }
  };

  render() {
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ width: "100%", overflow: "hidden" }}>
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Số điện thoại"
            keyboardType="numeric"
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
            value={this.state.phone}
            onChangeText={text => this.setState({ phone: text })}
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Mật khẩu"
            secureTextEntry
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
            value={this.state.repassword}
            onChangeText={text => this.setState({ repassword: text })}
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Tên"
            placeholderTextColor={color.colorText_nolected}
            style={{
              color: color.mainColor,
              height: 40,
              fontSize: values.fontSizeTitle,
              borderBottomColor: "#D6D6D6",
              borderBottomWidth: 0.5
            }}
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
        </View>
        <CheckBoxView
          title="Tôi đã hiểu rõ và đồng ý với điều khoản sử dụng và chính sách bảo mật"
          onPress={this.chooseUnderstand}
          isCheck={this.state.isUnderstand}
        />
        <ButtonGradient
          onPress={this.clickRegister}
          colors={
            !this.state.isUnderstand
              ? [color.borderColor, color.borderColor]
              : color.colors_gradient
          }
          containStyle={{ width: "80%" }}
          title={"Đăng ký"}
        />
      </View>
    );
  }
}

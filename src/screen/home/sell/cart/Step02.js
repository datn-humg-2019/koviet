import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { color, values } from "../../../../config";
import SearchView from "../../../../component/SearchView";
import EmailnputView from "../../../../component/EmailnputView";
import ButtonGradient from "../../../../component/ButtonGradient";
import CheckBoxView from "../../../../component/CheckBoxView";
import SimpleToast from "react-native-simple-toast";
import { validateEmail } from "../../../../utils/Func";

export default class Step02View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      isSendMail: true,
      isPrint: false
    };
  }

  onChangeText = email => {
    this.setState({ email });
  };

  handleClick = type => {
    if (type) {
      this.setState({
        isSendMail: false,
        isPrint: true
      });
    } else {
      this.setState({
        isSendMail: true,
        isPrint: false
      });
    }
  };

  send = () => {
    if (this.state.isSendMail) {
      if (this.state.email.trim() != "") {
        if (validateEmail(this.state.email)) {
        } else {
          SimpleToast.show("Bạn cần nhập đúng định dạng email");
        }
      } else {
        SimpleToast.show("Bạn cần nhập email");
      }
    }
  };

  handleNewCart = () => {
    if (this.state.isSendMail) {
      if (this.state.email.trim() != "") {
        if (validateEmail(this.state.email)) {
          this.props.goToNewCart(this.state.email);
        } else {
          SimpleToast.show("Bạn cần nhập đúng định dạng email");
        }
      } else {
        SimpleToast.show("Bạn cần nhập email");
      }
    }
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: color.HOME.bgColorHome
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "transparent",
            marginTop: 20,
            flex: 1,
            paddingHorizontal: 15
          }}
        >
          <CheckBoxView
            onPress={() => this.handleClick(0)}
            isCheck={this.state.isSendMail}
            title="Hoá đơn điện tử"
          />
          <CheckBoxView
            onPress={() => this.handleClick(1)}
            isCheck={this.state.isPrint}
            title="Hoá đơn giấy"
          />
          {this.state.isSendMail ? (
            <View>
              <Text
                style={{
                  fontSize: values.fontSizeTitle,
                  color: "#000",
                  marginBottom: 10
                }}
              >
                {"Nhập địa chỉ email"}
              </Text>
              <EmailnputView
                placeholder="Email"
                onChangeText={this.onChangeText}
                value={this.state.email}
                onPress={this.send}
              />
            </View>
          ) : (
            <View />
          )}
        </View>

        <View style={{ width: "100%", paddingHorizontal: 15 }}>
          {this.state.isPrint ? (
            <ButtonGradient
              onPress={() => this.setState({})}
              colors={["#1492E6", "#1492E6"]}
              title={"In hoá đơn"}
            />
          ) : (
            <View />
          )}

          <ButtonGradient
            containStyle={{
              marginTop: 10,
              marginBottom: 10 + values.bottomIphoneX
            }}
            onPress={this.handleNewCart}
            title={"Đơn hàng mới"}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

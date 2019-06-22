import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  DeviceEventEmitter
} from "react-native";
import { Navigation } from "react-native-navigation";
import { values, color } from "../../../../../config";
import ButtonGradient from "../../../../../component/ButtonGradient";
import SimpleToast from "react-native-simple-toast";
const type = { percent: 0, per: 1 };

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
// import Loading from '../../component/Loading';

@inject("OnApp", "Product")
export default class CreateSaleItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: type.percent,
      text: "",
      title: ""
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    } else if (buttonId == "extraInfo") {
      
    }
  }

  goBack = () => {
    // let { Product } = this.props;
    // if(status){
    //   callback && callback(true);
    //   Product.addNewSaleItem()
    // }
    // else
    Navigation.pop("CreateSaleItem");
  };

  chooseType = () => {
    let typeChange = this.state.type;
    if (this.state.type == type.percent) {
      typeChange = type.per;
    } else {
      typeChange = type.percent;
    }
    this.setState({
      type: typeChange
    });
  };

  onChangeText = text => {
    this.setState({ text });
  };

  save = () => {
    if (this.state.type == type.per) {
      //mỗi
      this.continue();
    } else {
      //phần trăm
      if (
        parseFloat(this.state.text + "") >= 0 &&
        parseFloat(this.state.text + "") <= 100
      ) {
        this.continue();
      } else {
        SimpleToast.show(
          "Giá trị bạn nhập cần lớn hơn bằng 0 và nhỏ hơn bằng 100"
        );
      }
    }
  };

  continue = () => {
    Product.addNewSaleItem();
    const self = this;
    let { Product } = this.props;
    let { title, text } = this.state;
    Product.addNewSaleItem(title, text, "", "", "", status => {
      if (status) {
        Product.getListDiscountCode("", "", 0, statusList => {
          if (statusList) {
            self.goBack();
          }
        });
      } else {
      }
    });
    // this.goBack()
  };

  render() {
    return (
      <TouchableOpacity
        style={{ flex: 1, width: "100%" }}
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          behavior={"padding"}
          enabled={values.platform == "ios" ? true : false}
          style={{ width: "100%", flex: 1 }}
        >
          <ScrollView style={{ width: "100%", flex: 1 }}>
            <View style={{ flex: 1, width: "100%", padding: 15 }}>
              <View style={{ width: "100%", marginTop: 15 }}>
                <Text
                  style={{
                    fontSize: values.fontSizeTitle,
                    color: "#000",
                    marginBottom: 5
                  }}
                >
                  {"Tiêu đề"}
                </Text>
                <TextInput
                  underlineColorAndroid={"transparent"}
                  placeholder="Nhập"
                  placeholderTextColor="#00000034"
                  style={[
                    {
                      width: "100%",
                      height: 40,
                      fontSize: values.fontSizeNormal,
                      paddingHorizontal: 10,
                      color: "#000",
                      backgroundColor: "#fff",
                      borderRadius: 7
                    },
                    styles.shadow
                  ]}
                  value={this.state.title}
                  onChangeText={text => this.setState({ title: text })}
                />
              </View>
              <View style={{ width: "100%", marginTop: 15 }}>
                <Text
                  style={{
                    fontSize: values.fontSizeTitle,
                    color: "#000",
                    marginBottom: 5
                  }}
                >
                  {"Giá trị"}
                </Text>
                <View
                  style={[
                    {
                      width: "100%",
                      height: 40,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      backgroundColor: "#fff",
                      borderRadius: 7
                    },
                    styles.shadow
                  ]}
                >
                  <TextInput
                    underlineColorAndroid={"transparent"}
                    placeholder="Để trống nếu bạn muốn tự điền số khi bán"
                    placeholderTextColor="#00000034"
                    style={[
                      {
                        flex: 1,
                        height: 40,
                        fontSize: values.fontSizeNormal,
                        paddingRight: 5,
                        color: "#000",
                        backgroundColor: "#fff",
                        borderRadius: 7
                      }
                    ]}
                    keyboardType={"numeric"}
                    value={this.state.text}
                    onChangeText={text => this.onChangeText(text)}
                  />
                  {/* <Text style={{
                                        flex: 1, fontSize: values.fontSizeNormal, color: '#00000070',
                                        paddingRight: 5,
                                    }}>{'Để trống nếu bạn muốn tự điền số khi bán'}</Text> */}
                  <TouchableOpacity
                    onPress={this.chooseType}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: "row",
                      borderRadius: 5,
                      overflow: "hidden"
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          this.state.type == type.percent
                            ? color.mainColor
                            : "#DFDFDF"
                      }}
                    >
                      <Text
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          color:
                            this.state.type == type.percent ? "#fff" : "#000"
                        }}
                      >
                        {"%"}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          this.state.type == type.per
                            ? color.mainColor
                            : "#DFDFDF"
                      }}
                    >
                      <Text
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          color: this.state.type == type.per ? "#fff" : "#000"
                        }}
                      >
                        {"đ"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{ width: "100%", paddingTop: 10, paddingHorizontal: 15 }}
          >
            <ButtonGradient
              onPress={this.continue}
              // colors={this.checkDone ? color.colors_gradient : ['#DFDFDF', '#DFDFDF']}
              containStyle={{ marginBottom: values.bottomIphoneX + 15 }}
              title={"Lưu"}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: values.fontSizeTitle,
    color: "#000"
  },
  viewGreen: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: color.mainColor
  },
  buttonParent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 15
  },
  shadow:
    values.platform == "ios"
      ? {
          shadowColor: "#000000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4
        }
      : { elevation: 5 }
});

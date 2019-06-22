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
  Alert,
  DeviceEventEmitter
} from "react-native";
import { Navigation } from "react-native-navigation";
import { values, color } from "../../../../../config";
import ButtonGradient from "../../../../../component/ButtonGradient";
import SimpleToast from "react-native-simple-toast";
import { get } from "lodash";
import { convertToPrice } from "../../../../../utils/Func";
const type = { percent: 0, per: 1 };

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
// import Loading from '../../component/Loading';

@inject("OnApp", "Product")
export default class SaleDetail extends Component {
  constructor(props) {
    super(props);
    console.log("props.item: " + JSON.stringify(props.item));
    this.state = {
      type: props.item.type != undefined ? props.item.type : type.percent,
      value: props.item.giatri ? props.item.giatri + "" : "",
      name: props.item.name || "",
      item: this.props.item
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    }
  }

  goBack = () => {
    Navigation.pop("SaleDetail");
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

  onChangeText = value => {
    this.setState({ value });
  };

  //   save = () => {
  //     if (this.state.type == type.per) {
  //       //mỗi
  //       this.continue();
  //     } else {
  //       //phần trăm
  //       if (
  //         parseFloat(this.state.value + "") >= 0 &&
  //         parseFloat(this.state.value + "") <= 100
  //       ) {
  //         this.continue();
  //       } else {
  //         SimpleToast.show(
  //           "Giá trị bạn nhập cần lớn hơn bằng 0 và nhỏ hơn bằng 100"
  //         );
  //       }
  //     }
  //   };

  continue = () => {
    const self = this;
    let { Product, item } = this.props;
    let { name, value } = this.state;
    Product.editSaleItem(item.id, name, value, "", "", "", status => {
      if (status) {
        Product.getListDiscountCode("", "", 0, statusList => {
          if (statusList) {
            self.goBack();
          }
        });
      } else {
      }
    });
  };

  deleteSale = () => {
    let { Product, item } = this.props;
    const self = this;
    Alert.alert("Xoá giảm giá", "Bạn thực sự muốn xoá giảm giá này chứ?", [
      {
        // text: 'No way',
        text: "Từ chối",
        onPress: () => console.log("Permission denied"),
        style: "cancel"
      },
      {
        text: "Xoá",
        //  text: 'Open Settings',
        onPress: () => {
          // this.props.Product.removeItemSale(this.props.item.id)
          // this.goBack()
          Product.removeItemSale(item.id, status => {
            if (status) {
              Product.getListDiscountCode("", "", 0, statusList => {
                if (statusList) {
                  self.goBack();
                }
              });
            }
          });
        }
      } //vao setting xin quyen
    ]);
  };

  render() {
    let { item } = this.state;
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
                  value={this.state.name}
                  onChangeText={name => this.setState({ name })}
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
                    value={this.state.value}
                    onChangeText={value => this.onChangeText(value)}
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
              containStyle={{ marginBottom: 15 }}
              title={"Lưu"}
            />
            <ButtonGradient
              onPress={this.deleteSale}
              colors={["#DC0000", "#DC0000"]}
              containStyle={{ marginBottom: values.bottomIphoneX + 15 }}
              title={"Xoá giảm giá"}
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

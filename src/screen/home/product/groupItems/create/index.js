import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  FlatList
} from "react-native";
import { Navigation } from "react-native-navigation";
import { values, color, images, config } from "../../../../../config";
import ButtonGradient from "../../../../../component/ButtonGradient";
import SimpleToast from "react-native-simple-toast";

const type = { percent: 0, per: 1 };
let marginRight = 15;
// let widthButtonColor = (values.deviceWidth - marginRight * 6) / 5 > 80 ? 80 : (values.deviceWidth - marginRight * 6) / 5
let widthButtonColor = 56;

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
const listColor = [
  {
    id: 0,
    color: "#15AF2B"
  },
  {
    id: 1,
    color: "#1492E6"
  },
  {
    id: 2,
    color: "#DC0000"
  },
  {
    id: 3,
    color: "#E88F0B"
  },
  {
    id: 4,
    color: "#8DAEE6"
  },
  {
    id: 5,
    color: "#1553AF"
  },
  {
    id: 6,
    color: "#BDCCD6"
  }
];
@inject("OnApp", "Product")
export default class CreateGroupItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: type.percent,
      name: "",
      itemColorCheck: listColor[0],
      listColor: listColor
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    } else if (buttonId == "save") {
      this.save();
    }
  }

  goBack = () => {
    Navigation.pop("CreateGroupItem");
  };

  save = () => {
    const self = this;
    const { Product } = this.props;
    if (this.state.name.trim() != "") {
      Product.createGroupProduct(this.state.name, status => {
        if (status) {
          Product.getDataListGroup("", "", 0, statusList => {
            if (statusList) {
              self.goBack();
            }
          });
        } else {
        }
      });
      // Product.addNewGroupItem(this.state.name, this.state.itemColorCheck.color, [])
      // Product.clearListSetProduct()
    } else {
      SimpleToast.show("Bạn cần nhập tiêu đề");
    }
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

  setProduct = () => {
    console.log(
      "listItemSetProduct: " +
        JSON.stringify(this.props.Product.listItemSetProduct)
    );
    Navigation.push("CreateGroupItem", {
      component: {
        id: "SetProductScreen",
        name: "SetProductScreen",
        passProps: {
          // type: { status: 'product', title: 'Mặt hàng' }
        },
        options: {
          topBar: {
            leftButtons: [
              {
                id: "back",
                color: "#fff",
                icon: images.ic_back
              }
            ],
            title: {
              text: "Gán hàng vào danh mục",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
              {
                id: "save",
                color: "#fff",
                text: "Lưu"
              }
            ],
            visible: true,
            background: { color: color.mainColor }
          },
          statusBar: {
            style: "light"
          }
        }
      }
    });
  };

  createProduct = () => {
    Navigation.push("CreateGroupItem", {
      component: {
        id: "CreateItem",
        name: "CreateItem",
        passProps: {
          prevScreen: config.prevScreen.group
        },
        options: {
          topBar: {
            leftButtons: [
              {
                id: "back",
                color: "#fff",
                icon: images.ic_back
              }
            ],
            title: {
              text: "Tạo mặt hàng",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
              {
                id: "save",
                text: "Lưu",
                color: "#fff"
              }
            ],
            visible: true,
            background: { color: color.mainColor }
          },
          statusBar: {
            style: "light"
          }
        }
      }
    });
  };

  chooseColor = item => {
    this.setState({ itemColorCheck: item });
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
            <View
              style={{ flex: 1, width: "100%", paddingVertical: marginRight }}
            >
              <View
                style={{
                  width: "100%",
                  marginTop: marginRight,
                  paddingHorizontal: marginRight
                }}
              >
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
                  value={this.state.name}
                  onChangeText={name => {
                    this.setState({ name });
                  }}
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
                />
              </View>
              <View style={{ width: "100%", marginTop: marginRight }}>
                {/* <Text
                  style={{
                    fontSize: values.fontSizeTitle,
                    paddingHorizontal: marginRight,
                    color: "#000",
                    marginBottom: 5
                  }}
                >
                  {"Chọn màu danh mục"}
                </Text> */}
                {/* <FlatList
                                    ListEmptyComponent={<Text style={{ fontSize: values.fontSizeNormal, color: '#00000090', textAlign: 'center', padding: 15 }}>{'Không có kết quả tìm kiếm!'}</Text>}
                                    // style={{ paddingTop: 10 }}
                                    numColumns={5}
                                    data={this.state.listColor}
                                    renderItem={this.renderItemColor}
                                    keyExtractor={(item, index) => index.toString()} /> */}
                {/* <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginLeft: marginRight
                  }}
                >
                  {this.state.listColor.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.chooseColor(item)}
                        key={item.id}
                        style={{
                          width: widthButtonColor,
                          height: widthButtonColor,
                          borderRadius: 8,
                          overflow: "hidden",
                          backgroundColor: item.color || color.mainColor,
                          marginRight: marginRight,
                          marginBottom: marginRight,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {this.state.itemColorCheck &&
                        this.state.itemColorCheck.id == item.id ? (
                          <Image
                            source={images.ic_tick}
                            style={{
                              width: widthButtonColor / 2,
                              tintColor: "#fff",
                              resizeMode: "contain"
                            }}
                          />
                        ) : null}
                      </TouchableOpacity>
                    );
                  })}
                </View> */}
              </View>
            </View>
          </ScrollView>
          <View
            style={{ width: "100%", paddingTop: 10, paddingHorizontal: 15 }}
          >
            <ButtonGradient
              onPress={this.setProduct}
              // colors={this.checkDone ? color.colors_gradient : ['#DFDFDF', '#DFDFDF']}
              containStyle={{ marginBottom: 10 }}
              title={"Gán hàng hoá"}
            />
            <ButtonGradient
              onPress={this.createProduct}
              // colors={this.checkDone ? color.colors_gradient : ['#DFDFDF', '#DFDFDF']}
              containStyle={{ marginBottom: values.bottomIphoneX + 15 }}
              title={"Tạo sản phẩm"}
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

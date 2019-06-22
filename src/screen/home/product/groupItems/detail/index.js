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
  FlatList,
  Alert
} from "react-native";
import { Navigation } from "react-native-navigation";
import { values, color, images, config } from "../../../../../config";
import ButtonGradient from "../../../../../component/ButtonGradient";
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

const type = { percent: 0, per: 1 };
let marginRight = 15;

// let widthButtonColor = (values.deviceWidth - marginRight * 6) / 5 > 80 ? 80 : (values.deviceWidth - marginRight * 6) / 5
let widthButtonColor = 56;

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import SimpleToast from "react-native-simple-toast";
import AppComponent from "../../../../../component/AppComponent";
import { get } from "lodash";

@inject("OnApp", "Product")
export default class GroupDetail extends AppComponent {
  constructor(props) {
    super(props);
    // let itemColorCheck = null;
    // listColor.map((item, index) => {
    //   if (item.color == this.props.item.color) {
    //     itemColorCheck = item;
    //   }
    // });
    // this.props.Product.listItemSetProduct = this.props.item.listProduct;

    this.state = {
      type: type.percent,
      name: (props.item && props.item.name) || "",
      itemColorCheck: listColor[0],
      listColor: listColor
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  componentDidMount() {
    const { Product, item } = this.props;
    // Product.getInfoGroupProduct(item.id);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    } else if (buttonId == "save") {
      this.save();
    }
  }

  save = () => {
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
    } else {
      SimpleToast.show("Bạn cần nhập tiêu đề");
    }
  };

  goBack = () => {
    Navigation.pop("GroupDetail");
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

  createProduct = () => {
    Navigation.push("GroupDetail", {
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

  gotoSetProduct = () => {
    Navigation.push("GroupDetail", {
      component: {
        id: "SetProductScreen",
        name: "SetProductScreen",
        passProps: {
          prevScreen: "group"
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

  setProduct = () => {
    const self = this;
    const { Product, item } = this.props;
    self.showLoading();
    Product.getListProductForGroup(item.id, status => {
      if (status) {
        self.hideLoading();
        self.gotoSetProduct();
      } else {
        self.hideLoading();
      }
    });
  };

  chooseColor = item => {
    this.setState({ itemColorCheck: item });
  };

  stopSaleItem = () => {
    const self = this;
    const { Product } = this.props;
    Alert.alert(
      "Ngừng kinh doanh",
      "Bạn thực sự muốn ngừng kinh doanh sản phẩm này?",
      [
        {
          // text: 'No way',
          text: "Từ chối",
          onPress: () => console.log("Permission denied"),
          style: "cancel"
        },
        {
          text: "Đồng ý",
          //  text: 'Open Settings',
          onPress: () => {
            Product.userStopProvidingCategory(this.props.item.id, (status, data) => {
              if (status) {
                SimpleToast.show("Ngừng kinh doanh nhóm sản phẩm thành công");
                Product.getAllGroupProduct(status => {
                  self.goBack();
                });
              }
            });
          }
        } //vao setting xin quyen
      ]
    );
  };

  startSaleItem = () => {
    const self = this;
    const { Product } = this.props;
    Product.userStartProvidingCategory(this.props.item.id, (status, data) => {
      if (status) {
        SimpleToast.show("Nhóm sản phẩm tiếp tục được kinh doanh");
        Product.getAllGroupProduct(status => {
          self.goBack();
        });
      }
    });
  };

  deleteGroup = () => {
    const self = this;
    const { Product } = this.props;
    Alert.alert("Xoá nhóm hàng", "Bạn thực sự muốn xoá nhóm hàng này chứ?", [
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
          self.props.Product.removeGroupProduct(this.props.item.id);
          Product.getAllGroupProduct(status => {
            self.goBack();
          });
        }
      } //vao setting xin quyen
    ]);
  };

  renderContent() {
    const { item } = this.props;
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
              {/* <View style={{ width: '100%', marginTop: marginRight, }}>
                                <Text style={{ fontSize: values.fontSizeTitle, paddingHorizontal: marginRight, color: '#000', marginBottom: 5 }}>{'Chọn màu danh mục'}</Text>
                               <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginLeft: marginRight }}>
                                    {this.state.listColor.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                onPress={() => this.chooseColor(item)}
                                                key={item.id} style={{
                                                    width: widthButtonColor,
                                                    height: widthButtonColor, borderRadius: 8, overflow: 'hidden',
                                                    backgroundColor: item.color || color.mainColor,
                                                    marginRight: marginRight, marginBottom: marginRight,
                                                    justifyContent: 'center', alignItems: 'center',
                                                }}>
                                                {
                                                    this.state.itemColorCheck && this.state.itemColorCheck.color == item.color
                                                        ?
                                                        <Image source={images.ic_tick}
                                                            style={{ width: widthButtonColor / 2, tintColor: '#fff', resizeMode: 'contain' }} />
                                                        :
                                                        null
                                                }
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View> */}
            </View>
          </ScrollView>
          <View
            style={{ width: "100%", paddingTop: 10, paddingHorizontal: 15 }}
          >
            {/* <ButtonGradient
              onPress={this.setProduct}
              // colors={this.checkDone ? color.colors_gradient : ['#DFDFDF', '#DFDFDF']}
              containStyle={{ marginBottom: 10 }}
              title={"Gán hàng hoá"}
            /> */}
            {/* <ButtonGradient
              onPress={this.createProduct}
              // colors={this.checkDone ? color.colors_gradient : ['#DFDFDF', '#DFDFDF']}
              containStyle={{ marginBottom: 10 }}
              title={"Tạo sản phẩm"}
            /> */}
            {get(item, "stop_providing") ? (
              <ButtonGradient
                onPress={this.startSaleItem}
                containStyle={{
                  marginBottom: values.bottomIphoneX + 15 
                }}
                title={"Tiếp tục kinh doanh"}
              />
            ) : (
              <ButtonGradient
                onPress={this.stopSaleItem}
                colors={["#F26B3A", "#F26B3A"]}
                containStyle={{
                  marginBottom: values.bottomIphoneX + 15 
                }}
                title={"Ngừng kinh doanh"}
              />
            )}

            {/* <ButtonGradient
              onPress={this.deleteGroup}
              colors={["#DC0000", "#DC0000"]}
              containStyle={{ marginBottom: values.bottomIphoneX + 15 }}
              title={"Xoá danh mục"}
            /> */}
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

import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";

import { color, values, config, images } from "../../config";
import ButtonGradient from "../../component/ButtonGradient";
import Camera from "react-native-camera";
import InfoBottomCartView from "../../screen/home/sell/InfoBottomCartView";
const widthCam = values.deviceWidth >= 250 ? 250 : values.deviceWidth - 20;
import _ from "lodash";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import ExtraInfoView from "../extraInfo";
import ItemFind from "./ItemFind";
@inject("Cam", "Sell", "Product")
@observer
export default class ScanQRScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      isShowViewItems: false,
      item: null
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBackCart();
    } else if (buttonId == "extraInfo") {
      // this.goBackCart()
      //an tam di
      this.props.Sell.showExtraInfo();
    }
  }

  clickListItem = item => {
    console.log(item);
  };

  goBackCart = () => {
    Navigation.pop("ScanQRScreen");
  };

  clickItemProduct = item => {
    console.log(item);
  };

  _onBarCodeRead = data => {
    console.log("data: ", data);
    let { Product } = this.props;
    if (!this.state.isShowViewItems) {
      if (data.data) {
        //id
        let item = _.find(toJS(Product.listProduct), function(o) {
          return o.code === data.data;
        });
        if (item) {
          console.log("du lieu tim kiem: " + JSON.stringify(item));
          this.setState({ item });
        }
      }
      this.showModalInfo();
    }
  };

  gotoCart = () => {
    Navigation.push("ScanQRScreen", {
      component: {
        id: "CartScreen",
        name: "CartScreen",
        passProps: {
          text: "CartScreen"
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
              text: "Thanh toán",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
              // {
              //   id: "extraInfo",
              //   color: "#fff",
              //   icon: images.ic_extraInfo
              // }
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

  showAppCustomer = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              id: "AddCustomerScreeen",
              name: "AddCustomerScreeen",
              passProps: {
                text: "stack with one child"
              },
              options: {
                topBar: {
                  leftButtons: [
                    {
                      id: "close",
                      color: "#fff",
                      icon: images.ic_close
                    }
                  ],
                  title: {
                    text: "Thêm khách hàng vào hoá đơn",
                    color: "#fff",
                    fontSize: values.nav.fontSize
                  },
                  rightButtons: [],
                  noBorder: true,
                  animate: true,
                  borderColor: "transparent", //android
                  // visible: false,
                  // drawBehind: true,
                  // transparent: true,
                  // translucent: true,
                  background: { color: color.mainColor }
                  // elevation: 0,
                }
              }
            }
          }
        ]
      }
    });
  };

  clickItemExtraInfo = item => {
    let { Sell } = this.props;
    if (item.id == config.extraInfo[0].id) {
      //them kh vao hoa don
      if (Sell.infoCart.customer) {
        this.gotoCustomerInfo(Sell.infoCart.customer);
      } else {
        this.showAppCustomer();
      }
    } else if (item.id == config.extraInfo[1].id) {
      //xoa hoa don
      Sell.deleteCart();
      Navigation.pop("ScanQRScreen");
    } else {
      //dong bo du lieu
    }
    Sell.dismissisExtraInfo();
  };
  gotoCustomerInfo = item => {
    Navigation.push("ScanQRScreen", {
      component: {
        id: "CustomerInfo",
        name: "CustomerInfo",
        passProps: {
          item: item,
          type: config.typeScreenCustomInfo.isInfoCustomer
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
              text: "Hồ sơ khách hàng",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
              {
                id: "delete",
                color: "#ccc",
                text: "Xoá KH"
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

  clickProduct = item => {
    console.log(item);
    let { Sell } = this.props;
    Sell.addToCart(item);
    this.dismissModalInfo();
  };

  showModalInfo = () => {
    this.setState({ isShowViewItems: true });
  };
  dismissModalInfo = () => {
    this.setState({ isShowViewItems: false });
  };

  render() {
    let { Cam, Sell } = this.props;
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          flashMode={
            Cam.isFlash
              ? Camera.constants.FlashMode.on
              : Camera.constants.FlashMode.off
          }
          type={
            Cam.isFront === true
              ? Camera.constants.Type.front
              : Camera.constants.Type.back
          }
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this._onBarCodeRead}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{ flex: 1, width: "100%", backgroundColor: "#00000070" }}
            />
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View
                style={{
                  height: widthCam,
                  flex: 1,
                  backgroundColor: "#00000070"
                }}
              />
              <View
                style={{
                  width: widthCam,
                  height: widthCam,
                  borderWidth: 1,
                  borderColor: color.mainColor,
                  backgroundColor: "transparent"
                }}
              />
              <View
                style={{
                  height: widthCam,
                  flex: 1,
                  backgroundColor: "#00000070"
                }}
              />
            </View>
            <View
              style={{ flex: 1, width: "100%", backgroundColor: "#00000070" }}
            />
          </View>
        </Camera>
        {this.state.isShowViewItems ? (
          <View
            style={{
              backgroundColor: "#00000080",
              width: "100%",
              height: "100%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "90%",
                backgroundColor: "#fff",
                borderRadius: 5,
                alignItems: "flex-end"
              }}
            >
              <TouchableOpacity
                onPress={this.dismissModalInfo}
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{ tintColor: "#00000070", width: 24, height: 24 }}
                  source={images.ic_close}
                />
              </TouchableOpacity>
              <View style={{ width: "100%", alignItems: "center" }}>
                {_.size(this.state.item) > 0 ? (
                  <ItemFind
                    item={this.state.item}
                    clickItem={this.clickProduct}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: values.fontSizeNormal,
                      color: "#00000090",
                      textAlign: "center",
                      padding: 15
                    }}
                  >
                    {"Không có kết quả tìm kiếm!"}
                  </Text>
                )}
              </View>
            </View>
          </View>
        ) : null}

        {!(this.props.type && this.props.type.status == "product") ? (
          <InfoBottomCartView onPress={this.gotoCart} />
        ) : null}
        <ExtraInfoView clickItem={this.clickItemExtraInfo} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: "100%"
  },
  preview: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#000",
    padding: 10,
    margin: 40
  }
});

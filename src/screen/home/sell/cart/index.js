import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import ListItemView from "./listItem";

import { toJS } from "mobx";
import { color, values, config, images } from "../../../../config";
import ButtonGradient from "../../../../component/ButtonGradient";
import Step01View from "./Step01";
import Step02View from "./Step02";
import ExtraInfoView from "../../../../component/extraInfo";

import { inject, observer } from "mobx-react";

@inject("Sell", "Bill", "Product")
@observer
export default class CartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      if (this.state.step == 1) {
        this.goBackCart();
      } else {
        this.goBackStep1();
      }
    } else if (buttonId == "extraInfo") {
      //an tam di
      // this.props.Sell.showExtraInfo();
    }
  }

  clickListItem = item => {
    console.log(item);
  };

    nextToStep2 = () => {
    this.setState({ step: 2 });
  };

  goBackStep1 = () => {
    this.setState({ step: 1 });
  };

  goBackCart = () => {
    Navigation.pop("CartScreen");
  };

  goToNewCart = email => {
    let { Sell, Bill, Product } = this.props;

    //Tạo vào hoá đơn
    Product.updateInventoryListProduct(Sell.genListCart());
    Bill.createBill(email, Sell.genDataBill(), status => {});
    Sell.deleteCart();
    Navigation.popTo("SellScreen");
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
                      icon: images.ic_back
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
      this.goBackCart();
    } else {
      //dong bo du lieu
    }
    Sell.dismissisExtraInfo();
  };

  gotoCustomerInfo = item => {
    Navigation.push("CartScreen", {
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
          }
        }
      }
    });
  };

  clickItemProduct = item => {
    console.log(item);
    // this.gotoDetail(item);
    // this.props.clickItemCart(item)
  };

  gotoDetail = item => {
    Navigation.push("CartScreen", {
      component: {
        id: "ItemCartDetail",
        name: "ItemCartDetail",
        passProps: {
          item: item
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
              text: item.name || "",
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

  render() {
    let { Sell } = this.props;
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: color.HOME.bgColorHome
        }}
      >
        {this.state.step == 1 ? (
          <Step01View
            changeStep={this.nextToStep2}
            clickItem={this.clickItemProduct}
            goBackCart={this.goBackCart}
          />
        ) : (
          <Step02View
            goBack={this.goBackStep1}
            goToNewCart={this.goToNewCart}
          />
        )}

        <ExtraInfoView clickItem={this.clickItemExtraInfo} />
      </View>
    );
  }
}

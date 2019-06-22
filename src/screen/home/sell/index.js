import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  AppRegistry,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  DeviceEventEmitter
} from "react-native";

import { Navigation } from "react-native-navigation";
import ListItemView from "./listItem";
import { color, values, config, screenId, images } from "../../../config";
import InfoBottomCartView from "./InfoBottomCartView";
import TopView from "./topView";
import SearchView from "../../../component/SearchView";
import { size, get, map } from "lodash";
import { toJS } from "mobx";
import { bodauTiengViet } from "../../../utils/Func";
import FilterView from "./filter/";
import ExtraInfoView from "../../../component/extraInfo";

import { inject, observer } from "mobx-react";
import AppComponent from "../../../component/AppComponent";
@inject("Sell", "OnApp", "Product")
@observer
export default class SellScreen extends AppComponent {
  constructor(props) {
    super(props);
    let { Product } = this.props;
    this.state = {
      textSearch: "",
      product_id: "",
      page: 0,
      check: false,
      dataSearch: Product.dataListSell,
      isShowFilter: false,
      isShowCancel: false
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  componentWillMount() {}

  componentDidMount() {
    const { Product } = this.props;
    if (size(toJS(Product.listProduct)) === 0) {
      this.handlerGetListProduct();
    }
  }

  handlerGetListProduct = (callback = null) => {
    let { Product ,Sell} = this.props;
    let { textSearch, product_id } = this.state;
    Product.getAllProduct(
      textSearch,
      product_id,
      Sell.typeFilterSelected.id,
      status => {
        callback && callback(status);
      }
    );
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      Navigation.pop("SellScreen");
    } else if (buttonId == "extraInfo") {
      //an tam di
      // this.props.Sell.showExtraInfo();
    }
  }

  onChangeText = textSearch => {
    let { Sell, Product } = this.props;
    this.setState(
      {
        textSearch: textSearch,
        page: 0
        // check: textSearch.trim() === '' ? false : true,
      },
      () => {
        this.handlerGetListProduct();
      }
    );

    // if (textSearch.trim() === '') {
    //     this.setState({
    //         dataSearch: Product.dataListSell,
    //     })
    // }
    // //Tim kiem offline
    // let obj = [];
    // var xxx = _.filter(Product.dataListSell, function (o) {
    //     let name = bodauTiengViet(o.title).toLowerCase()
    //     if (name.includes(bodauTiengViet(textSearch).toLowerCase())) {
    //         obj.push(o)
    //     }
    // });
    // this.setState({
    //     dataSearch: obj
    // })
  };

  resetTextInput = () => {
    let { Sell, Product } = this.props;

    this.setState(
      {
        textSearch: "",
        page: 0,
        isShowCancel: false
      },
      () => {
        this.handlerGetListProduct();
      }
    );
  };

  clickCancel = () => {
    // this.refs.
    Keyboard.dismiss();
    this.resetTextInput();
  };

  onFocus = () => {
    this.setState({
      isShowCancel: true
    });
  };

  chooseTypeFilter = () => {
    this.setState({ isShowFilter: true });
  };

  clickItemFilter = item => {
    console.log(item);
    let { Sell, Product } = this.props;
    Sell.setTypeFilter(item);
    const { textSearch, product_id } = this.state;
    Product.getAllProduct(textSearch, product_id, item.id, status => {
    });
    this.dismissFilter();
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
      // this.goBackCart()
    } else {
      //dong bo du lieu
    }
    Sell.dismissisExtraInfo();
  };

  gotoCustomerInfo = item => {
    Navigation.push("SellScreen", {
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

  clickListItem = item => {
    console.log(item);
    let { Sell } = this.props;
    Sell.addToCart(item);
  };

  dismissFilter = () => {
    this.setState({ isShowFilter: false });
  };

  gotoCart = () => {
    Navigation.push("SellScreen", {
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
          }
        }
      }
    });
  };

  showScanQR = () => {
    Navigation.push("SellScreen", {
      component: {
        id: "ScanQRScreen",
        name: "ScanQRScreen",
        passProps: {
          text: "Pushed screen"
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
              text: screenId.HOME.item.sell.title,
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
              // {
              //   id: "extraInfo",
              //   color: "#fff",
              //   icon: images.ic_extraInfo
              // },
              {
                id: "flash",
                color: "#fff",
                component: { name: "CameraButton" }
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

  renderContent() {
    let { Sell, Product, OnApp } = this.props;
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: color.HOME.bgColorHome
        }}
      >
        <View
          style={{
            width: "100%",
            height: 40,
            marginVertical: 10,
            paddingHorizontal: 10,
            flexDirection: "row"
          }}
        >
          <SearchView
            placeholder="Tìm kiếm"
            onChangeText={this.onChangeText}
            value={this.state.textSearch}
            onFocus={this.onFocus}
            isShowCancel={this.state.isShowCancel}
            clickCancel={this.clickCancel}
          />
          {OnApp.isShowScanQR ? (
            <TouchableOpacity
              onPress={this.showScanQR}
              style={{
                height: "100%",
                width: 35,
                alignItems: "center",
                backgroundColor: "transparent",
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: "#000",
                  resizeMode: "contain"
                }}
                source={images.ic_scanner}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ paddingLeft: 7 }} />
          )}
          {!this.state.isShowCancel ? (
            <TouchableOpacity
              onPress={this.chooseTypeFilter}
              style={{
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: "transparent"
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: values.fontSizeNormal,
                  color: "#000",
                  paddingRight: 5
                }}
              >
                {(Sell.typeFilterSelected && Sell.typeFilterSelected.name) ||
                  ""}
              </Text>
              <Image
                style={{ width: 12, tintColor: "#000", resizeMode: "contain" }}
                source={images.ic_down}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <ListItemView
          data={toJS(Product.listProduct)}
          clickItem={this.clickListItem}
          page={Product.page}
          getData={this.handlerGetListProduct}
        />
        <InfoBottomCartView onPress={this.gotoCart} />
        <FilterView
          isShow={this.state.isShowFilter}
          dismiss={this.dismissFilter}
          itemSelected={Sell.typeFilterSelected}
          data={Product.genListGroupProductFilter()}
          clickItem={this.clickItemFilter}
        />
        <ExtraInfoView clickItem={this.clickItemExtraInfo} />
      </View>
    );
  }
}

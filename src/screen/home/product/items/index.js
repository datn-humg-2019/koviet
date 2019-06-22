import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  DeviceEventEmitter
} from "react-native";
import { Navigation } from "react-native-navigation";
import { screenId, values, color, images, config } from "../../../../config";
import SearchView from "../../../../component/SearchView";
import FilterView from "../../../../component/filter";
import { size } from "lodash";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { bodauTiengViet } from "../../../../utils/Func";
import ListItemView from "./listItem";

const statusData = { search: "search", filter: "filter", none: "none" };
@inject("Product", "OnApp", "Sell")
@observer
export default class ItemScreen extends Component {
  constructor(props) {
    super(props);
    let { Product } = this.props;
    this.state = {
      textSearch: "",
      dataFilter: Product.listProduct,
      isShowFilter: false,
      isShowCancel: false,
      product_id: ""
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
    const { Product ,Sell} = this.props;
    const { textSearch, product_id } = this.state;
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
      this.goBack();
    } else if (buttonId == "scan") {
      this.showScanQR();
    } else if (buttonId == "save") {
      this.goBack();
    }
  }

  goBack = () => {
    Navigation.pop("ItemScreen");
  };
  onChangeText = textSearch => {
    let { Sell, Product } = this.props;
    this.setState(
      {
        textSearch: textSearch,
        page: 0
      },
      () => {
        this.handlerGetListProduct(0);
      }
    );
  };

  resetTextInput = () => {
    let { Product } = this.props;
    this.setState({
      textSearch: "",

      isShowCancel: false
    });
    Product.getAllProduct("", "", "", status => {
      callback && callback(status);
    });
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

  showScanQR = () => {
    Navigation.push("ItemScreen", {
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
              text: screenId.HOME.item.product.title,
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
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

  dismissFilter = () => {
    this.setState({ isShowFilter: false });
  };
  chooseTypeFilter = () => {
    this.setState({ isShowFilter: true });
  };

  clickItemFilter = item => {
    console.log("item filter" + JSON.stringify(item));
    let { Product,Sell } = this.props;
    Sell.setTypeFilter(item);
    const { textSearch, product_id } = this.state;
    Product.getAllProduct(textSearch, product_id, item.id, status => {});
    this.dismissFilter();
  };

  clickListItem = item => {
    Navigation.push("ItemScreen", {
      component: {
        id: "CreateDetailItem",
        name: "CreateDetailItem",
        passProps: {
          item: item
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
              text: item.name || "",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [
              // {
              //   id: "save",
              //   text: "Lưu",
              //   color: "#fff"
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

  createNew = () => {
    Navigation.push("ItemScreen", {
      component: {
        id: "CreateItem",
        name: "CreateItem",
        passProps: {
          prevScreen: config.prevScreen.product
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

  render() {
    let { Product, Sell } = this.props;
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
          {!this.state.isShowCancel ? (
            <TouchableOpacity
              onPress={this.chooseTypeFilter}
              style={{
                height: 40,
                alignItems: "center",
                marginLeft: 10,
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
          getData={this.handlerGetListProduct}
        />
        <FilterView
          isShow={this.state.isShowFilter}
          dismiss={this.dismissFilter}
          itemSelected={Sell.typeFilterSelected}
          data={Product.genListGroupProductFilter()}
          clickItem={this.clickItemFilter}
        />
        <TouchableOpacity
          onPress={this.createNew}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            bottom: values.bottomIphoneX + 15,
            right: 15,
            backgroundColor: color.mainColor,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute"
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: "#fff",
              resizeMode: "contain"
            }}
            source={images.ic_plus}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

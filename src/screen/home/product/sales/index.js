import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Keyboard } from "react-native";
import { Navigation } from "react-native-navigation";
import { screenId, values, color, images } from "../../../../config";
import SearchView from "../../../../component/SearchView";
import FilterView from "../../../../component/filter";
import _ from "lodash";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { bodauTiengViet } from "../../../../utils/Func";
import ListItemView from "./listItem";
@inject("Product", "OnApp")
@observer
export default class SaleScreen extends Component {
  constructor(props) {
    super(props);
    const { Product } = this.props;
    this.state = {
      textSearch: "",
      code: "",
      dNhomVoucherId: "",
      dataSearch: Product.listSale,
      isShowFilter: false,
      isShowCancel: false,
      check: false
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  componentDidMount() {
    this.handlerGetListDiscountCode(0);
  }
  handlerGetListDiscountCode = (page, callback = null) => {
    let { Product } = this.props;
    let { dNhomVoucherId, textSearch, code } = this.state;

    Product.getListDiscountCode(textSearch, dNhomVoucherId, page, status => {
      callback && callback(status);
    });
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      Navigation.pop("SaleScreen");
    }
  }

  onChangeText = textSearch => {
    const { Product } = this.props;
    this.setState({
      textSearch: textSearch,
      check: textSearch.trim() === "" ? false : true
    });
    if (textSearch.trim() === "") {
      this.setState({
        dataSearch: Product.listSale
      });
    }
    //Tim kiem offline
    let obj = [];
    var xxx = _.filter(Product.listSale, function(o) {
      let name = bodauTiengViet(o.name).toLowerCase();
      if (name.includes(bodauTiengViet(textSearch).toLowerCase())) {
        obj.push(o);
      }
    });
    this.setState({
      dataSearch: obj
    });
  };

  resetTextInput = () => {
    const { Product } = this.props;
    this.setState({
      textSearch: "",
      check: false,
      dataSearch: Product.listSale,
      isShowCancel: false
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

  clickListItem = item => {
    console.log(item);
    Navigation.push("SaleScreen", {
      component: {
        id: "SaleDetail",
        name: "SaleDetail",
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
              text: item.name|| "",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [],
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
    Navigation.push("SaleScreen", {
      component: {
        id: "CreateSaleItem",
        name: "CreateSaleItem",
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
              text: "Tạo giảm giá",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: [],
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
    const { Product } = this.props;
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
        </View>
        <ListItemView
          data={
            this.state.check ? this.state.dataSearch : toJS(Product.listSale)
          }
          clickItem={this.clickListItem}
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

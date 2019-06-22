import React, { Component } from "react";
import { Text, View, Keyboard } from "react-native";
import { Navigation } from "react-native-navigation";
import ListItemView from "./listItem";
import _ from "lodash";

import { color } from "../../../../../config";
import SearchView from "../../../../../component/SearchView";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { bodauTiengViet } from "../../../../../utils/Func";
import AppComponent from "../../../../../component/AppComponent";

@inject("Product")
export default class SetProductScreen extends AppComponent {
  constructor(props) {
    super(props);
    let { Product } = this.props;
    this.state = {
      textSearch: "",
      dataSearch: Product.listProduct,
      isShowFilter: false,
      isShowCancel: false,
      check: false
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  componentDidMount() {
    const { Product } = this.props;
    this.showLoading();
    Product.checkListProduct(status => {
      this.hideLoading();
      if (status) {
      } else {
      }
    });
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
      // this.props.Product.clearListSetProduct()
    } else if (buttonId == "save") {
      this.save();
    }
  }

  save = () => {
    this.goBack();
  };
  goBack = () => {
    Navigation.pop("SetProductScreen");
  };

  onChangeText = textSearch => {
    let { Product } = this.props;
    this.setState({
      textSearch: textSearch,
      check: textSearch.trim() === "" ? false : true
    });
    if (textSearch.trim() === "") {
      this.setState({
        dataSearch: Product.listGroupProduct
      });
    }
    //Tim kiem offline
    let obj = [];
    var xxx = _.filter(Product.listProduct, function(o) {
      let name = bodauTiengViet(o.title).toLowerCase();
      let groupTitle = bodauTiengViet(
        Product.checkGroup(o.groupId)
      ).toLowerCase();
      if (
        name.includes(bodauTiengViet(textSearch).toLowerCase()) ||
        groupTitle.includes(bodauTiengViet(textSearch).toLowerCase())
      ) {
        obj.push(o);
      }
    });
    this.setState({
      dataSearch: obj
    });
  };

  resetTextInput = () => {
    let { Product } = this.props;
    this.setState({
      textSearch: "",
      check: false,
      dataSearch: Product.listProduct,
      isShowCancel: false
    });
  };

  clickCancel = () => {
    Keyboard.dismiss();
    this.resetTextInput();
  };

  onFocus = () => {
    this.setState({
      isShowCancel: true
    });
  };

  clickListItem = (item, status) => {
    let { Product } = this.props;
    console.log(item);
    if (status) {
      //check=> them vao ds
      Product.setListSetProduct(item);
    } else {
      //xoa khoi dasnh sahc
      Product.removeListSetProduct(item);
    }

    console.log(
      "listItemSetProduct: " + JSON.stringify(Product.listItemSetProduct)
    );
  };

  componentWillUnmount() {}

  renderContent() {
    let { Product } = this.props;
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
            this.state.check ? this.state.dataSearch : toJS(Product.listProduct)
          }
          clickItem={this.clickListItem}
        />
      </View>
    );
  }
}

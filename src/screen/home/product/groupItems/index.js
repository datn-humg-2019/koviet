import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Keyboard } from "react-native";
import { Navigation } from "react-native-navigation";
import { screenId, values, color, images } from "../../../../config";
import SearchView from "../../../../component/SearchView";
import FilterView from "../../../../component/filter";
import { size, filter } from "lodash";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { bodauTiengViet } from "../../../../utils/Func";
import ListItemView from "./listItem";
@inject("Product", "OnApp")
@observer
export default class GroupItemScreen extends Component {
  constructor(props) {
    super(props);
    let { Product } = this.props;
    this.state = {
      textSearch: "",
      code: "",
      dataSearch: Product.listGroupProduct,
      isShowFilter: false,
      isShowCancel: false,
      check: false
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {}

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      Navigation.pop("GroupItemScreen");
    }
  }

  componentDidMount() {
    const { Product } = this.props;
    if (size(toJS(Product.listGroupProduct)) === 0) {
      this.handlerGetData();
    }
  }

  handlerGetData = (callback = null) => {
    let { Product } = this.props;
    Product.getAllGroupProduct(status => {
      callback && callback(status);
    });
  };

  onChangeText = textSearch => {
    let { Product } = this.props;
    this.setState({
      textSearch,
      check: textSearch.trim() === "" ? false : true
    });

    if (textSearch.trim() === "") {
      this.setState({
        dataSearch: Product.listGroupProduct
      });
    }
    //Tim kiem offline
    let obj = [];
    var xxx = filter(Product.listGroupProduct, function(o) {
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
    let { Product } = this.props;
    this.setState({
      textSearch: "",
      check: false,
      dataSearch: Product.listGroupProduct,
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

    Navigation.push("GroupItemScreen", {
      component: {
        id: "GroupDetail",
        name: "GroupDetail",
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
              //   id: "save",
              //   color: "#fff",
              //   text: "Lưu"
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
    Navigation.push("GroupItemScreen", {
      component: {
        id: "CreateGroupItem",
        name: "CreateGroupItem",
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
              text: "Tạo danh mục",
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

  render() {
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
            this.state.check
              ? this.state.dataSearch
              : toJS(Product.listGroupProduct)
          }
          clickItem={this.clickListItem}
          listSelected={Product.listSelected}
          getData={this.handlerGetData}
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

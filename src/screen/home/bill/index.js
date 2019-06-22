import React, { Component } from "react";
import { Text, View, DeviceEventEmitter } from "react-native";
import { Navigation } from "react-native-navigation";
import _ from "lodash";
import { inject, observer } from "mobx-react";
import { color, values, images } from "../../../config";
import SearchView from "../../../component/SearchView";
import ListItemView from "./listItem";
import { toJS } from "mobx";
import { bodauTiengViet } from "../../../utils/Func";
import moment from "moment";
@inject("Bill", "OnApp")
@observer
export default class BillScreen extends Component {
  constructor(props) {
    super(props);

    let { Bill } = this.props;
    this.state = {
      textSearch: "",
      check: false,
      dataSearch: Bill.listBill,
      isShowCancel: false,
      dateSelected: moment().format("YYYY-MM-DD")
    };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {
    let { Bill } = this.props;
  }

  componentDidMount() {
    this.handlerGetData();
  }

  handlerGetData = (callback = null) => {
    let { Bill } = this.props;
    Bill.getListBill(Bill.dayFilter, Bill.dayFilter, status => {
      callback && callback(status);
    });
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      Navigation.pop("BillScreen");
    } else if (buttonId == "calendar") {
      this.showCalendar();
    }
  }

  showCalendar = () => {
    Navigation.push("BillScreen", {
      component: {
        id: "CalendarScreen",
        name: "CalendarScreen",
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
              text: "Chọn thời gian",
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

  showDetail = item => {
    let rightButtons = [];
    // if (!item.isRefund) {
    //     rightButtons = {
    //         id: 'refund',
    //         text: 'Hoàn tiền',
    //         color: '#fff'
    //     }
    // }
    console.log("item", JSON.stringify(item));
    Navigation.push("BillScreen", {
      component: {
        id: "BillDetail",
        name: "BillDetail",
        passProps: {
          text: "Pushed screen",
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
              text: item.id ? `HD${item.id}` : "",
              color: "#fff",
              alignment: "center",
              fontSize: values.nav.fontSize
            },
            rightButtons: rightButtons,
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

  onChangeText = textSearch => {
    let { Bill } = this.props;
    this.setState({
      textSearch,
      check: textSearch.trim() === "" ? false : true
    });
    if (textSearch.trim() === "") {
      this.setState({
        dataSearch: Bill.listBill
      });
    }
    //Tim kiem offline
    let obj = [];
    var xxx = _.filter(Bill.listBill, function(o) {
      let name = bodauTiengViet("HD" + o.id + "").toLowerCase();
      if (name.includes(bodauTiengViet(textSearch).toLowerCase())) {
        obj.push(o);
      }
    });
    this.setState({
      dataSearch: obj
    });
  };

  resetTextInput = () => {
    let { Sell } = this.props;
    this.setState({
      textSearch: "",
      check: false,
      dataSearch: Bill.listBill,
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
    this.showDetail(item);
  };

  render() {
    let { Bill, OnApp } = this.props;
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
            clickCancel={this.clickCancel}
          />
        </View>
        <ListItemView
          data={this.state.check ? this.state.dataSearch : toJS(Bill.listBill)}
          clickItem={this.clickListItem}
          getData={this.handlerGetData}
        />
      </View>
    );
  }
}

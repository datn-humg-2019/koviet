import React, { Component } from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { Navigation } from "react-native-navigation";
import { values, color, images, config } from "../../../../config";
import numeral from "numeral";
import moment from "moment";
import ButtonGradient from "../../../../component/ButtonGradient";
import ListItemView from "./listItem";
import { get } from "lodash";
import { inject, observer } from "mobx-react";
import SimpleToast from "react-native-simple-toast";
@inject("Bill", "OnApp", "Product")
@observer
export default class BillDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  componentWillMount() {
    const { Bill } = this.props;
    Bill.clearBillDetail();
  }

  componentDidMount = () => {
    const { Bill, item } = this.props;
    Bill.getBillDetail(get(item, "id"), status => {
      if (status) {
      }
    });
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId == "back") {
      this.goBack();
    } else if (buttonId == "refund") {
      if (this.state.data.isRefund) {
        SimpleToast.show("Hoá đơn đã hoàn tiền");
      } else {
        this.showRefund();
      }
    }
  }

  goBack = () => {
    Navigation.pop("BillDetail");
  };
  showRefund = () => {
    let { Product, Bill } = this.props;
    Alert.alert(
      "Hoàn tiền lại hoá đơn này",
      "Bạn thực sự muốn thực hiện việc này chứ?",
      [
        {
          // text: 'No way',
          text: "Từ chối",
          onPress: () => console.log("Permission denied"),
          style: "cancel"
        },
        {
          text: "Hoàn tiền",
          //  text: 'Open Settings',
          onPress: () => {
            //xoá hoá đơn này
            Bill.updateRefundItem(this.state.data.id);
            //cập nhật lại số lượng hàng tồn kho
            Product.updateRefundInventoryListProduct(this.state.data.listCart);
            this.goBack();
          }
        } //vao setting xin quyen
      ]
    );
    // Navigation.push('BillDetail', {
    //     component: {
    //         id: 'RefundScreen',
    //         name: 'RefundScreen',
    //         passProps: {
    //             text: 'Pushed screen',
    //             id: this.props.id
    //         },
    //         options: {
    //             topBar: {
    //                 leftButtons: [
    //                     {
    //                         id: 'back',
    //                         color: '#fff',
    //                         icon: images.ic_back
    //                     }
    //                 ],
    //                 title: {
    //                     text: 'Hoàn tiền',
    //                     color: '#fff',
    //                     alignment: 'center',
    //                     fontSize: values.nav.fontSize
    //                 },
    //                 rightButtons: [],
    //                 visible: true,
    //                 background: { color: color.mainColor }
    //             }
    //         }
    //     }
    // });
  };

  sendCart = () => {};

  clickListItem = item => {
    console.log(item);
  };

  render() {
    let { data } = this.state;
    let { Bill, item } = this.props;
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <View
            style={{
              width: "100%",
              backgroundColor: "#E7F2E9",
              padding: 15,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
                fontWeight: "bold",
                color: color.mainColor
              }}
            >
              {numeral(Bill.billDetail.price).format("0,0") + "đ"}
            </Text>
            <Text
              style={{
                fontSize: values.fontSizeNormal,
                textAlign: "center",
                fontWeight: "bold",
                color: "#000",
                width: "100%"
              }}
            >
              {
                //   data.payType == config.payType.card ? "Thẻ" :
                "Tiền mặt"
              }
            </Text>
            <Text
              style={{
                fontSize: values.fontSizeNormal,
                textAlign: "center",
                marginTop: 5,
                color: "gray",
                width: "100%"
              }}
            >
              {data.isRefund ? "(Đã hoàn tiền)" : ""}
            </Text>
          </View>
          <View style={{ flex: 1, width: "100%", padding: 15 }}>
            <View style={{}}>
              <Text style={{ fontSize: values.fontSizeNormal }}>
                <Text style={{ color: color.HOME.nolected }}>
                  {"Thu ngân: "}
                </Text>
                <Text style={{ fontWeight: "bold", color: "#000" }}>
                  {"Chủ sở hữu"}
                </Text>
              </Text>
              {get(item, "created") ? (
                <Text
                  style={{ fontSize: values.fontSizeNormal, marginVertical: 3 }}
                >
                  <Text style={{ color: color.HOME.nolected }}>
                    {"Thời gian: "}
                  </Text>
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    {moment(item.created).format("HH:mm DD/MM/YYYY")}
                  </Text>
                </Text>
              ) : (
                <Text />
              )}
              {/* <Text style={{ fontSize: values.fontSizeNormal }}>
                <Text style={{ color: color.HOME.nolected }}>{"POS: "}</Text>
                <Text style={{ fontWeight: "bold", color: color.mainColor }}>
                  {"POS 001"}
                </Text>
              </Text> */}
            </View>
            <ListItemView
              data={(Bill.billDetail && Bill.billDetail.detail) || []}
              clickItem={this.clickListItem}
            />
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
                paddingVertical: 10,
                backgroundColor: "transparent"
              }}
            >
              <Text
                style={{ fontSize: values.fontSizeNormal, fontWeight: "500" }}
              >
                <Text style={{ color: color.HOME.nolected }}>
                  {"Tổng tiền: "}
                </Text>
                <Text style={{ color: color.mainColor }}>
                  {numeral(Bill.billDetail.price).format("0,0") + "đ"}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{ width: "100%", paddingHorizontal: 15, paddingTop: 10 }}>
          <ButtonGradient
            onPress={this.sendCart}
            containStyle={{ marginBottom: values.bottomIphoneX + 15 }}
            title={"Gửi hoá đơn"}
          />
        </View>
      </View>
    );
  }
}

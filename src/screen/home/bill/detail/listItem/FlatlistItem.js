import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import moment from "moment";
import { get } from "lodash";
import { values, color, images } from "../../../../../config";
export default class FlatlistItem extends Component {
  render() {
    let { item, clickItem } = this.props;
    let width = values.deviceWidth / 7.5 < 80 ? values.deviceWidth / 7.5 : 80;
    // let priceSale = 0;
    // if (item.sales) {
    //     item.sales.map((obj, index) => {
    //         if (obj) {
    //             // type: 0//1 ; 0: phần trăm; 1: mỗi
    //             if (obj.type == 1) {
    //                 priceSale = priceSale + parseFloat(obj.value + '')
    //             } else {
    //                 priceSale = priceSale + (
    //                     parseFloat(obj.value + '')
    //                     * parseFloat(item.price + '')
    //                     * (parseFloat(item.value + '') / parseFloat(item.valueDefault + ''))
    //                     / 100)
    //             }
    //         }
    //     })
    // }
    return (
      <TouchableOpacity
        onPress={() => clickItem(item)}
        style={[
          {
            width: "100%",
            paddingVertical: 10,
            alignSelf: "center",
            justifyContent: "space-between",
            borderBottomColor: "#000",
            borderBottomWidth: 0.5,
            overflow: "hidden",
            alignItems: "center"
          }
        ]}
      >
        <View
          style={[
            {
              width: "100%",
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "space-between",
              overflow: "hidden",
              alignItems: "center"
            }
          ]}
        >
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text
              numberOfLines={1}
              style={{
                color: color.HOME.nolected,
                marginBottom: 2,
                fontSize: 11,
                flex: 1
              }}
            >
              {get(item, "product_warehouse_id.name") || ""}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: "#000",
                fontSize: 11,
                flex: 1,
                fontWeight: "500"
              }}
            >
              {(item.count || "") +
                "x" +
                (item.price ? numeral(item.price).format("0,0") + "đ" : "")}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={{ fontSize: 11, fontWeight: "500", color: "#000" }}
          >
            {item.price
              ? `${numeral(
                  parseFloat(item.price + "") * parseFloat(item.count + "")
                ).format("0,0")} đ`
              : ""}
          </Text>
        </View>
        <View style={{ width: "100%", paddingLeft: 10 }} />
      </TouchableOpacity>
    );
  }
}

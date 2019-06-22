import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import { get } from "lodash";
import { values, color } from "../../../../../config";
export default class FlatlistItem extends Component {
  render() {
    let { item, clickItem } = this.props;
    let width = values.deviceWidth / 7.5 < 80 ? values.deviceWidth / 7.5 : 80;
    return (
      <TouchableOpacity
        onPress={() => clickItem(item)}
        style={[
          {
            width: "100%",
            flexDirection: "row",
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            overflow: "hidden",
            alignItems: "center"
          },
          get(item, "stop_providing")
            ? { backgroundColor: "#D7DAE0" }
            : { backgroundColor: "white" }
        ]}
      >
        <View
          style={{
            width: width,
            height: width,
            borderRadius: 10,
            overflow: "hidden"
          }}
        >
          {get(item, "image") ? (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: get(item, "image") }}
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: item.color || color.mainColor
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 10,
            justifyContent: "space-between",
            backgroundColor: "transparent"
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: values.fontSizeTitle,
              fontWeight: "500",
              color: "#000",
              width: "100%",
              backgroundColor: "transparent"
            }}
          >
            {get(item, "name") || ""}
          </Text>
          {/* <Text
                        style={{ color: color.HOME.nolected, fontSize: values.fontSizeNormal, flex: 1 }}
                    >{item.listProduct.length > 0
                        ?
                        (item.listProduct.length + ' mặt hàng')
                        :
                        ('Không có sản phẩm')
                        }</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

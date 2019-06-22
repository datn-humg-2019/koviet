import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import { get, head } from "lodash";
import { color, values } from "../../config";
import _ from "lodash";
export default class ItemFind extends Component {
  render() {
    let { item, clickItem } = this.props;
    let width = values.deviceWidth / 7.5 < 80 ? values.deviceWidth / 7.5 : 80;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => clickItem(item)}
        style={[
          {
            width: "100%",
            flexDirection: "row",
            padding: 10,
            marginBottom: 10,
            backgroundColor: "white",
            borderRadius: 10,
            overflow: "hidden",
            alignItems: "center"
          }
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
          {head(get(item, "images")) ? (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: head(get(item, "images")) }}
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
              fontSize: values.fontSizeNormal,
              color: color.HOME.nolected,
              width: "100%",
              backgroundColor: "transparent"
            }}
          >
            {get(item, "name") || ""}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: color.mainColor,
                fontSize: values.fontSizeSmaller,
                width: "100%"
              }}
            >
              {get(item, "price_sale") ? (
                <Text>{`${numeral(get(item, "price_sale")).format(
                  "0,0"
                )} đ  `}</Text>
              ) : (
                <View />
              )}
              {/* {get(item, "price_origin") ? (
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    color: "gray"
                  }}
                >
                  {`${numeral(get(item, "price_origin")).format("0,0")} đ`}
                </Text>
              ) : (
                <View />
              )} */}
            </Text>
            {/* <View style={{ backgroundColor: color.mainColor, borderRadius: 3 }}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  paddingHorizontal: 7,
                  paddingVertical: 2
                }}
              >
                {"Mua"}
              </Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

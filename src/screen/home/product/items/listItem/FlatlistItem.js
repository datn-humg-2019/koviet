import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import { get, head } from "lodash";
import { values, color,fonts } from "../../../../../config";
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
            ? { backgroundColor: "#ccc" }
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
              color: "#000",
              width: "100%",
              backgroundColor: "transparent"
            }}
          >
            {get(item, "name") || ""}
          </Text>
          <Text
            style={{
              color: color.mainColor,
              fontSize: values.fontSizeSmaller,
              width: "100%"
            }}
          >
            <Text>{`${numeral(get(item, "price_sale")).format(
              "0,0"
            )} đ  `}</Text>
            {/* <Text
              style={{
                textDecorationLine: "line-through",
                color: "gray"
              }}
            >
              {`${numeral(get(item, "price_origin")).format("0,0")} đ`}
            </Text> */}
          </Text>
        </View>
        {
          <View
            style={{
              borderLeftWidth: 1,
              borderLeftColor: color.HOME.borderColorAdd,
              marginLeft: 5,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ paddingLeft: 5, backgroundColor: "transparent" }}>
              <Text
                style={{
                  color: color.HOME.nolected,
                  fontSize: values.fontSizeSmall
                }}
              >
                {"Tồn kho: "}
              </Text>
              <Text
                style={{
                  color: color.mainColor,
                  fontSize: values.fontSizeTitle
                }}
              >
                {get(item, "count")
                  ? numeral(get(item, "count")).format("0,0")
                  : "0"}
              </Text>
            </Text>
          </View>
        }
        {get(item, "stop_providing") ? (
            <Text
              style={[
                {
                  right: 0,
                  top: 25,
                  position: "absolute",
                  fontSize: 10,
                  fontFamily: fonts.svn_inter,
                  color: color.red
                },
                { transform: [{ rotate: "40deg" }] }
              ]}
            >
              Ngừng kinh doanh
            </Text>
          ) : (
            <Text />
          )}
      </TouchableOpacity>
      // </View >
    );
  }
}

import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import moment from "moment";
import { get } from "lodash";
import { values, color } from "../../../../config";
export default class FlatlistItem extends React.PureComponent {
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
          {item.listCart && item.listCart[0] && item.listCart[0].image ? (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: item.listCart[0].image }}
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor:
                  (item.listCart &&
                    item.listCart[0] &&
                    item.listCart[0].color) ||
                  color.mainColor
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 3,
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              justifyContent: "space-between",
              backgroundColor: "transparent"
            }}
          >
            <Text numberOfLines={1} style={{ fontSize: values.fontSizeNormal }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: color.mainColor,
                  flex: 1,
                  backgroundColor: "transparent"
                }}
              >
                {item.code}
              </Text>
            </Text>
            {item.description ? (
              <Text
                numberOfLines={1}
                style={{ fontSize: values.fontSizeNormal }}
              >
                <Text
                  style={{
                    color: "#00000090",
                    fontSize: 11,
                    flex: 1,
                    fontStyle: "italic",
                    paddingBottom: 4,
                    backgroundColor: "transparent"
                  }}
                >
                  {item.description}
                </Text>
              </Text>
            ) : (
              <View />
            )}
            <Text
              numberOfLines={1}
              // ellipsizeMode='clip'
              style={{ fontSize: values.fontSizeNormal }}
            >
              <Text style={{ color: color.HOME.nolected }}>
                {"Thời gian: "}
              </Text>
              <Text
                style={{
                  color: color.HOME.nolected,
                  flex: 1,
                  backgroundColor: "transparent",
                  fontWeight: "bold"
                }}
              >
                {moment(item.created).format("HH:mm DD/MM/YYYY") || ""}
              </Text>
            </Text>
          </View>
          <View
            style={{
              borderLeftColor: "#ccc",
              borderLeftWidth: 0.5,
              marginLeft: 5,
              maxWidth: values.deviceWidth / 3
            }}
          >
            {item.id ? (
              <Text
                ellipsizeMode="middle"
                numberOfLines={1}
                style={{
                  marginLeft: 7,
                  color: color.mainColor,
                  fontSize: values.fontSizeSmall,
                  fontWeight: "bold"
                }}
              >
                {`HD${item.id}`}
              </Text>
            ) : (
              <View />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

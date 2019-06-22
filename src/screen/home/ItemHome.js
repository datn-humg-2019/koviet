import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { values, images, color } from "../../config";

export default class ItemHome extends Component {
  render() {
    let { onPress, title, image, marginRight } = this.props;
    let width = values.isTablet
      ? (values.deviceWidth - 200) / 2 < 300
        ? (values.deviceWidth - 200) / 2
        : 300
      : (values.deviceWidth - 60) / 2 < 150
      ? (values.deviceWidth - 60) / 2
      : 150;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          {
            width: width,
            height: width,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff99",
            borderRadius: 12
          },
          marginRight ? { marginRight } : {}
        ]}
      >
        <Image
          style={{
            width: 70,
            tintColor: color.mainColor,
            resizeMode: "contain"
          }}
          source={image || images.ic_sell}
        />
        <Text
          numberOfLines={2}
          style={{
            fontSize: 18,
            paddingTop: 5,
            textAlign: "center",
            width: "100%"
          }}
        >
          {title || ""}
        </Text>
      </TouchableOpacity>
    );
  }
}

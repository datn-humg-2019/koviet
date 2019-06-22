import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import { values, color } from "../../../../../../config";
export default class FlatlistItem extends Component {
  render() {
    let { item, clickItem } = this.props;
    return (
      <TouchableOpacity
        onPress={() => clickItem(item)}
        style={[
          {
            width: "100%",
            paddingVertical: 10,
            borderBottomColor: "#ccc",
            borderBottomWidth: 0.5
          },
          
        ]}
      >
        <Text
          style={{ fontSize: values.fontSizeNormal, color: "#000", flex: 1 }}
        >
          {item.name || ""}
        </Text>
      </TouchableOpacity>
    );
  }
}

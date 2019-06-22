import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { get } from "lodash";
import { values, color } from "../../config";
export default class FlatlistItem extends Component {
  render() {
    let { item, clickItem, itemSelected } = this.props;

    return (
      <TouchableOpacity
        onPress={() => clickItem(item)}
        style={[
          {
            backgroundColor: "#fff",
            borderRadius: 10
          }
        ]}
      >
        <Text
          style={{
            color:
              itemSelected.id == item.id
                ? color.mainColor
                : color.HOME.nolected,
            paddingHorizontal: 10,
            fontSize: values.fontSizeNormal,
            paddingVertical: 7
          }}
        >
          {get(item, "name") || ""}
        </Text>
      </TouchableOpacity>
    );
  }
}

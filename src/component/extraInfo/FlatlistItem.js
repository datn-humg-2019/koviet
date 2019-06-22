import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { get } from "lodash";
import { values, color, config } from "../../config";
export default class FlatlistItem extends Component {
  clickItem = () => {
    if (this.props.item.id == config.extraInfo[2].id) {
      this.props.clickItem(this.props.item);
    } else {
      if (this.props.isClick) {
        this.props.clickItem(this.props.item);
      } else {
        console.log("khong duoc click khi khong co gio hang");
      }
    }
  };
  render() {
    let { item, clickItem, isClick } = this.props;

    return (
      <TouchableOpacity
        onPress={this.clickItem}
        activeOpacity={
          this.props.item.id == config.extraInfo[2].id ? 0.7 : isClick ? 0.7 : 1
        }
        style={[
          {
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            borderRadius: 10,
            paddingVertical: 7,
            flexDirection: "row"
          }
        ]}
      >
        <Image
          style={{
            width: 15,
            marginRight: 10,
            height: 15,
            resizeMode: "contain",
            tintColor:
              this.props.item.id == config.extraInfo[2].id
                ? color.mainColor
                : isClick
                ? color.mainColor
                : "#ccc"
          }}
          source={item.image}
        />
        <Text
          numberOfLines={1}
          style={{
            color: color.HOME.nolected,
            fontSize: values.fontSizeNormal,
            flex: 1
          }}
        >
          {get(item,'name') || ""}
        </Text>
      </TouchableOpacity>
    );
  }
}

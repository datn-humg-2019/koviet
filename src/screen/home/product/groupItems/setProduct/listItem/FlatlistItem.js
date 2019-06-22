import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import numeral from "numeral";
import { get } from "lodash";

import { values, color, images } from "../../../../../../config";

export default class FlatlistItem extends Component {
  constructor(props) {
    super(props);
    // console.log('isCheck: ' + this.props.isCheck + ' id: ' + JSON.stringify(this.props.item))
    this.state = {
      isCheck: this.props.isCheck || false
    };
  }

  clickItem = () => {
    this.props.clickItem(this.props.item, !this.state.isCheck);
    this.setState({ isCheck: !this.state.isCheck });
  };

  render() {
    let { item, clickItem, groupTitle, isCheck } = this.props;
    let width = values.deviceWidth / 7.5 < 80 ? values.deviceWidth / 7.5 : 80;
    return (
      <TouchableOpacity
        onPress={this.clickItem}
        activeOpacity={0.7}
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
          {item.image ? (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: item.image }}
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
              flex: 1,
              backgroundColor: "transparent"
            }}
          >
            {get(item, "name") || ""}
          </Text>
          <Text style={{ color: color.HOME.nolected, flex: 1 }}>
            {get(item, "dNhomMatHang.name") || ""}
          </Text>
        </View>
        {this.state.isCheck ? (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 3,
              marginLeft: 5,
              justifyContent: "center",
              alignItems: "center",
              borderColor: color.mainColor,
              borderWidth: 1.5
            }}
          >
            <Image
              style={{ width: 12, resizeMode: "contain" }}
              source={images.ic_tick}
            />
          </View>
        ) : (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 3,
              marginLeft: 5,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#C5C5C5",
              borderWidth: 1.5
            }}
          />
        )}
      </TouchableOpacity>
    );
  }
}

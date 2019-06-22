import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { get } from "lodash";
import numeral from "numeral";

import { values, color, images } from "../../../../../config";
import { convertToPrice } from "../../../../../utils/Func";
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
            marginBottom: 10,
            height: 68,
            backgroundColor: "white",
            borderRadius: 8,
            overflow: "hidden",
            alignItems: "center"
          }
        ]}
      >
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Text
            numberOfLines={2}
            style={{ backgroundColor: "transparent", flex: 1 }}
          >
            {get(item, "name") || ""}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: color.mainColor,
              fontSize: values.fontSizeTitle,
              fontWeight: "500",
              paddingLeft: 10
            }}
          >
            {convertToPrice(get(item, "giatri"))}
            {/* {item.type == 0
              ? item.giatri + "%"
              : numeral(item.giatri).format("0,0") + " đ"} */}
          </Text>
        </View>

        <Image
          style={{
            width: 20,
            height: 20,
            position: "absolute",
            left: 0,
            top: -3,
            resizeMode: "contain"
          }}
          source={images.ic_sale_banner}
        />
      </TouchableOpacity>
      // </View >
    );
  }
}

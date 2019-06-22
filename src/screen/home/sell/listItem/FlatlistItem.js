import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Swipeout from "react-native-swipeout";
import { get, head } from "lodash";
import numeral from "numeral";

import { values, color, fonts } from "../../../../config";
import SimpleToast from "react-native-simple-toast";
import Share from "react-native-share";
export default class FlatlistItem extends Component {
  shareItem = () => {
    const { item } = this.props;
    let title = item.name || "";
    let url = item.url || "";
    let shareOptions = {
      title: title,
      message: "From koviet",
      url: url,
      subject: "Chia sẻ đường dẫn" //  for email
    };
    Share.open(shareOptions);
  };

  render() {
    const { item, clickItem, share } = this.props;
    const width = values.deviceWidth / 7.5 < 80 ? values.deviceWidth / 7.5 : 80;
    const swipeoutBtns = [
      {
        text: "Chia sẻ",
        backgroundColor: color.mainColor,
        onPress: this.shareItem
      }
    ];

    return (
      <View
        style={[
          {
            width: "100%",
            // flexDirection: 'row', padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            overflow: "hidden",
            alignItems: "center"
          }
        ]}
      >
        <Swipeout
          style={{ flex: 1, alignItems: "center", width: "100%" ,backgroundColor:'#fff'}}
          autoClose={true}
          sensitivity={100}
          right={swipeoutBtns}
        >
          <TouchableOpacity
            onPress={() =>
              get(item, "stop_providing")
                ? SimpleToast.show("Mặt hàng đang ngừng kinh doanh")
                : clickItem(item)
            }
            style={[
              {
                width: "100%",
                flexDirection: "row",
                padding: 10,
                borderRadius: 10,
                overflow: "hidden",
                alignItems: "center"
              },
              get(item, "stop_providing")
                ? { backgroundColor: "#D7DAE0" ,}
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
                  color: color.HOME.nolected,
                  width: "100%"
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
            </View>
          </TouchableOpacity>

          {parseFloat(get(item, "count") + "") < 1 ? (
            <View
              style={{
                width: "100%",
                // borderRadius:8,
                backgroundColor: "#00000070",
                height: "100%",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  padding: 5,
                  backgroundColor: "#00000030",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  overflow: "hidden"
                }}
              >
                <Text
                  style={{
                    fontSize: values.fontSizeTitle,
                    color: "#fff",
                    textAlign: "center"
                  }}
                >
                  {"Hết hàng"}
                </Text>
              </View>
            </View>
          ) : null}
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
        </Swipeout>
      </View>
    );
  }
}

import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { values, images, color } from "../../../../../config";
import { map } from "lodash";
let marginRight = 15;
let widthButtonColor = 56;
export default class ChooseImageView extends Component {
  click = () => {};
  render() {
    let { title, onPress, editable, listImages } = this.props;
    return (
      <View
        style={{ width: "100%", marginTop: marginRight, paddingHorizontal: 15 }}
      >
        <Text
          style={{
            fontSize: values.fontSizeNormal,
            color: "#000",
            marginBottom: 5
          }}
        >
          {title || ""}
        </Text>

        <TouchableOpacity
          onPress={!editable ? this.click : onPress}
          activeOpacity={0.7}
          // onPress={this.showChooseImage}
          style={styles.chooseImage2Content}
        >
          {map(listImages, avatar => {
            return (
              <View
                style={{
                  borderRadius: 8,
                  width: 60,
                  height: 60,
                  borderColor: "#ccc",
                  borderWidth: 0.5,
                  marginRight: 10,
                  overflow: "hidden"
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain"
                  }}
                  source={{ uri: avatar }}
                />
              </View>
            );
          })}
          <View
            style={{
              width: 56,
              height: 56,
              marginVertical: 25,
              backgroundColor: color.mainColor,
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
                tintColor: "#fff"
              }}
              source={images.ic_take_photo}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chooseImage: {
    marginTop: 15,
    width: (values.deviceWidth - 15 * 4) / 3,
    height: (values.deviceWidth - 15 * 4) / 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10
  },
  chooseImage2: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    paddingHorizontal: 5,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center"

    // paddingRight: 10,
  },
  chooseImage2Content: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#DADADA",
    borderStyle: "dashed"
  }
});
